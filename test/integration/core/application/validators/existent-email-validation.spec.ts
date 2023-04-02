import { generate } from "cpf";
import { faker } from "@faker-js/faker";
import { ConnectionDatabase } from "@infra/database/connection-database";
import { DbRepositoryFactory } from "@infra/factories/repositories";
import { FindAccountByEmailUsecase } from "@application/use-cases";
import { ExistentEmailValidation } from "@application/validators";
import { ExistsEmailException } from "@application/exceptions";
import { HttpRequest } from "@infra/protocols";
import { Account } from "@domain/entities";
import { FindAccountByEmail } from "@domain/use-cases/account/find-account-by-email";

let connection: ConnectionDatabase
let repositoryFactory: DbRepositoryFactory
let findAccountByEmailUsecase: FindAccountByEmail
let sut: ExistentEmailValidation

beforeAll(() => {
    connection = new ConnectionDatabase()
    repositoryFactory = new DbRepositoryFactory()
    findAccountByEmailUsecase = new FindAccountByEmailUsecase(repositoryFactory)
    sut = new ExistentEmailValidation(findAccountByEmailUsecase)
})
afterEach(async () => {
    await connection.clearStorage('account')
})
afterAll(async () => {
    await connection.clearStorage('account')
    connection.close()
})

function generateEmail(): string {
    return faker.internet.email()
}

function addNewAccount(email: string): Account.State {
    const account = new Account({
        id: faker.datatype.uuid(),
        cpf: generate().replace(/[-.]/g, ""),
        name: faker.name.firstName(),
        birthdate: new Date('1995-01-08').toString(),
        phone: '83976884321',
        email,
        password: faker.internet.password()
    })
    return account.getState()
}

function makeRequestWithBodyData(email: string): HttpRequest {
    return {
        body: addNewAccount(email)
    }
}

describe('Existent account validation', () => {
    it('should find a registred account passing data body', async () => {
        const email = generateEmail()
        await connection.getConnection().account.create({
            data: addNewAccount(email)
        })
        const error = await sut.validate(makeRequestWithBodyData(email))
        expect(error).toEqual(new ExistsEmailException())
    })

    it('should find a registred email passing data body', async () => {
        const email = generateEmail()
        const error = await sut.validate(makeRequestWithBodyData(email))
        expect(error).toBeFalsy()
    })
})

import { generate } from "cpf";
import { faker } from "@faker-js/faker";
import { ConnectionDatabase } from "@infra/database/connection-database";
import { DbRepositoryFactory } from "@infra/factories/repositories";
import { FindAccountByEmailUsecase } from "@application/use-cases";
import { NotFoundEmailValidation } from "@application/validators";
import { NotFoundEmailException } from "@application/exceptions";
import { HttpRequest } from "@infra/protocols";
import { Account } from "@domain/entities";
import { FindAccountByEmail } from "@domain/use-cases/account";

let connection: ConnectionDatabase
let repositoryFactory: DbRepositoryFactory
let findAccountByEmailUsecase: FindAccountByEmail
let sut: NotFoundEmailValidation

beforeAll(() => {
    connection = new ConnectionDatabase()
    repositoryFactory = new DbRepositoryFactory()
    findAccountByEmailUsecase = new FindAccountByEmailUsecase(repositoryFactory)
    sut = new NotFoundEmailValidation(findAccountByEmailUsecase)
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

describe('Not found email validation', () => {
    it('should throw trying find an unregistred account', async () => {
        const email = generateEmail()
        const error = await sut.validate(makeRequestWithBodyData(email))
        expect(error).toEqual(new NotFoundEmailException())
    })

    it('should find a registred email', async () => {
        const email = generateEmail()
        await connection.getConnection().account.create({
            data: addNewAccount(email)
        })
        const error = await sut.validate(makeRequestWithBodyData(email))
        expect(error).toBeFalsy()
    })
})

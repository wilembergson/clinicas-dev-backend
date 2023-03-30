import { generate } from "cpf";
import { faker } from "@faker-js/faker";
import { HttpRequest } from "../../../../../src/core/infra/protocols";
import { ExistentEmailValidation } from "../../../../../src/core/application/validators";
import { ConnectionDatabase } from "../../../../../src/core/infra/database/connection-database";
import { FindAccountByCpfUsecase } from "../../../../../src/core/application/use-cases";
import { DbRepositoryFactory } from "../../../../../src/core/infra/factories/repositories";
import { Account } from "../../../../../src/core/domain/entities";
import { ExistsEmailException } from "../../../../../src/core/application/exceptions";
import { FindAccountByEmail } from "../../../../../src/core/domain/use-cases/find-account-by-email";

let connection: ConnectionDatabase
let repositoryFactory: DbRepositoryFactory
let findAccountByCpfUsecase: FindAccountByEmail
let sut: ExistentEmailValidation

beforeAll(() => {
    connection = new ConnectionDatabase()
    repositoryFactory = new DbRepositoryFactory()
    findAccountByCpfUsecase = new FindAccountByCpfUsecase(repositoryFactory)
    sut = new ExistentEmailValidation(findAccountByCpfUsecase)
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
        console.log(error)
        expect(error).toEqual(new ExistsEmailException())
    })

    it('should find a registred email passing data body', async () => {
        const email = generateEmail()
        const error = await sut.validate(makeRequestWithBodyData(email))
        expect(error).toBeFalsy()
    })
})

import { generate } from "cpf";
import { faker } from "@faker-js/faker";
import { Account } from "@domain/entities";
import { HttpRequest } from "@infra/protocols";
import { GetAccountNameController } from "@infra/controllers";
import { DbRepositoryFactory } from "@infra/factories/repositories";
import { ConnectionDatabase } from "@infra/database/connection-database";

describe('GetAccountNameController', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: DbRepositoryFactory
    let sut: GetAccountNameController

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new DbRepositoryFactory()
        sut = new GetAccountNameController()
    })
    afterEach(async () => {
        await connection.clearStorage('account')
    })
    afterAll(async () => {
        await connection.clearStorage('account')
        connection.close()
    })

    function makeAccount(): Account {
        const account = new Account({
            id: faker.datatype.uuid(),
            cpf: generate().replace(/[-.]/g, ""),
            name: faker.name.firstName(),
            birthdate: new Date('1995-01-08').toString(),
            phone: '83976884321',
            email: faker.internet.email(),
            password: faker.internet.password()
        })
        return account
    }
    
    function makeRequest(account: Account): HttpRequest {
        return {
            sessionAccount: account
        }
    }

    it('should return an existent account name', async () => {
        const accountData = await repositoryFactory.accountRepository().add(makeAccount())
        const account = new Account(accountData)
        const response = await sut.handle(makeRequest(account))
        expect(response.statusCode).toEqual(200)
        expect(response.body.name).toEqual(account.getState().name)
    })
})

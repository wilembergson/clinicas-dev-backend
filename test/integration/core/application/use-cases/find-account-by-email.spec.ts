import { generate } from "cpf"
import { faker } from "@faker-js/faker"
import { ConnectionDatabase } from "@infra/database/connection-database"
import { DbRepositoryFactory } from "@infra/factories/repositories"
import { FindAccountByEmailUsecase } from "@application/use-cases"
import { Account } from "@domain/entities"
import { FindAccountByEmail } from "@domain/use-cases/account"

describe('FindAccountByCpf', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: DbRepositoryFactory
    let sut: FindAccountByEmail

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new DbRepositoryFactory()
        sut = new FindAccountByEmailUsecase(repositoryFactory)
    })

    afterAll(async () => {
        await connection.clearStorage('account')
        connection.close()
    })

    function makeAccount(): Account {
        return new Account({
            cpf: generate().replace(/[-.]/g, ""),
            name: faker.name.firstName(),
            birthdate: new Date('1995-01-08').toString(),
            phone: '83976884321',
            email: faker.internet.email(),
            password: faker.internet.password()
        })

    }

    it('should find an existent account by email', async () => {
        const account = makeAccount()
        await repositoryFactory.accountRepository().add(account)
        const response = await sut.execute(account.getState().email)
        expect(response).toStrictEqual(account.getInformations())
    })

    it('should find return null by an unexistent email', async () => {
        const account = makeAccount()
        const response = await sut.execute(account.getState().email)
        expect(response).toBeNull()
    })
})
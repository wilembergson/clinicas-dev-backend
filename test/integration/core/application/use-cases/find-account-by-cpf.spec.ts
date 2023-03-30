import { generate } from "cpf"
import { faker } from "@faker-js/faker"
import { Account } from "../../../../../src/core/domain/entities"
import { FindAccountByCpfUsecase } from "../../../../../src/core/application/use-cases"
import { DbRepositoryFactory } from "../../../../../src/core/infra/factories/repositories"
import { FindAccountByCpf } from "../../../../../src/core/domain/use-cases/find-account-by-cpf"
import { ConnectionDatabase } from "../../../../../src/core/infra/database/connection-database"

describe('FindAccountByCpf', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: DbRepositoryFactory
    let sut: FindAccountByCpf

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new DbRepositoryFactory()
        sut = new FindAccountByCpfUsecase(repositoryFactory)
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

    it('should find an existent account by cpf', async () => {
        const account = makeAccount()
        await repositoryFactory.accountRepository().add(account)
        const response = await sut.execute(account.getState().cpf)
        expect(response).toStrictEqual(account.getInformations())
    })

    it('should find return null by an unexistent cpf', async () => {
        const account = makeAccount()
        const response = await sut.execute(account.getState().cpf)
        expect(response).toBeNull()
    })
})
import { generate } from "cpf"
import { faker } from "@faker-js/faker"
import { Account } from "@domain/entities"
import { AddConsult } from "@domain/use-cases/consult/add-consult"
import { DbRepositoryFactory } from "@infra/factories/repositories"
import { ConnectionDatabase } from "@infra/database/connection-database"
import { AddConsultUsecase } from "@application/use-cases/consult/add-consult"

describe('AddConsult', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: DbRepositoryFactory
    let sut: AddConsult

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new DbRepositoryFactory()
        sut = new AddConsultUsecase(repositoryFactory)
    })

    afterAll(async () => {
        await connection.clearStorage('consult')
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

    function makeConsult() {
        return {
            specialty: 'PEDIATRIA',
            date: new Date().toDateString()
        }
    }

    it('should save a new consult', async () => {
        const account = makeAccount()
        await repositoryFactory.accountRepository().add(account)
        const response = await sut.execute(makeConsult(), account)
        expect(response.getState()).toHaveProperty('account')
        expect(response.getState()).toHaveProperty('specialty')
    })

})
import { generate } from "cpf";
import { faker } from "@faker-js/faker";
import { HttpRequest } from "@infra/protocols";
import { Account, Consult } from "@domain/entities";
import { ListConsults } from "@domain/use-cases/consult";
import { ListConsultsController } from "@infra/controllers";
import { ListConsultsUsecase } from "@application/use-cases";
import { DbRepositoryFactory } from "@infra/factories/repositories";
import { ConnectionDatabase } from "@infra/database/connection-database";

describe('ListConsulstController', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: DbRepositoryFactory
    let listConsultsUsecase: ListConsults
    let sut: ListConsultsController

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new DbRepositoryFactory()
        listConsultsUsecase = new ListConsultsUsecase(repositoryFactory)
        sut = new ListConsultsController(listConsultsUsecase)
    })
    afterEach(async () => {
        await connection.clearStorage('consult')
        await connection.clearStorage('account')
    })
    afterAll(async () => {
        await connection.clearStorage('consult')
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
    
    async function makeConsult(date: string, account: Account){
        const consult = new Consult({
            date
        })
        const specialty = await repositoryFactory.specialtyRepository().getByName('PEDIATRIA')
        consult.addSpecialty(specialty)
        consult.addAccount(account)
        return consult
    }

    function makeRequest(account: Account): HttpRequest {
        return {
            sessionAccount: account
        }
    }

    it('should list the registred consults', async () => {
        const accountData = await repositoryFactory.accountRepository().add(makeAccount())
        const account = new Account(accountData)
        const consult1 = await makeConsult('2024-12-02', account)
        const consult2 = await makeConsult('2024-12-09', account)
        const list = [consult1, consult2]
        await repositoryFactory.consultRepository().save(consult1)
        await repositoryFactory.consultRepository().save(consult2)
        const response = await sut.handle(makeRequest(account))
        expect(response.statusCode).toEqual(200)
        expect(response.body.length).toEqual(list.length)
    })

    it('should throw a server error', async () => {
        const response = await sut.handle(null)
        expect(response.statusCode).toEqual(500)
    })
})

import { generate } from "cpf";
import { faker } from "@faker-js/faker";
import { Account } from "@domain/entities";
import { HttpRequest } from "@infra/protocols";
import { AddConsult } from "@domain/use-cases/consult";
import { AddConsultController } from "@infra/controllers";
import { AddConsultUsecase } from "@application/use-cases";
import { MissingParamError } from "@application/exceptions";
import { DbRepositoryFactory } from "@infra/factories/repositories";
import { ConnectionDatabase } from "@infra/database/connection-database";
import { addConsultValidationFactory } from "@infra/factories/validators/add-consult-validation-factory";


describe('AddConsultController', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: DbRepositoryFactory
    let addConsultUsecase: AddConsult
    let sut: AddConsultController
    type RequestBody = {
        specialty: string
        date: string
    }

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new DbRepositoryFactory()
        addConsultUsecase = new AddConsultUsecase(repositoryFactory)
        sut = new AddConsultController(addConsultValidationFactory(), addConsultUsecase)
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

    function makeRequest(body:RequestBody, account: Account): HttpRequest {
        return {
            body,
            sessionAccount: account
        }
    }

    it('should add a new consult', async () => {
        const account = await repositoryFactory.accountRepository().add(makeAccount())
        const addConsult: RequestBody = {
            specialty: 'PEDIATRIA',
            date: '2024-12-03'
        }
        const response = await sut.handle(makeRequest(addConsult, new Account(account)))
        expect(response.statusCode).toEqual(201)
        expect(response.body).toStrictEqual({ message: 'Consulta marcada' })
    })

    it('should throw a server error', async () => {
        const response = await sut.handle(null)
        expect(response.statusCode).toEqual(500)
    })

    it('should throw for invalid body params', async () => {
        const account = await repositoryFactory.accountRepository().add(makeAccount())
        const response = await sut.handle(makeRequest(null, new Account(account)))
        expect(response.statusCode).toEqual(422)
        expect(response.body).toEqual(new MissingParamError(response.body.message))
    })
})

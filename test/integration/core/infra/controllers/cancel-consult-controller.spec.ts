import { generate } from "cpf";
import { faker } from "@faker-js/faker";
import { HttpRequest } from "@infra/protocols";
import { Account, Consult } from "@domain/entities";
import { CancelConsult } from "@domain/use-cases/consult";
import { MissingParamError, NotFoundConsultException } from "@application/exceptions";
import { CancelConsultController } from "@infra/controllers";
import { CancelConsultUsecase } from "@application/use-cases";
import { DbRepositoryFactory } from "@infra/factories/repositories";
import { ConnectionDatabase } from "@infra/database/connection-database";
import { cancelConsultValidationFactory } from "@infra/factories/validators/cancel-consult-validation-factory";


describe('AddConsultController', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: DbRepositoryFactory
    let cancelConsultUsecase: CancelConsult
    let sut: CancelConsultController

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new DbRepositoryFactory()
        cancelConsultUsecase = new CancelConsultUsecase(repositoryFactory)
        sut = new CancelConsultController(cancelConsultValidationFactory(), cancelConsultUsecase)
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
    async function makeConsult(account: Account){
        const consult = new Consult({
            date: '2024-12-02'
        })
        const specialty = await repositoryFactory.specialtyRepository().getByName('PEDIATRIA')
        consult.addSpecialty(specialty)
        consult.addAccount(account)
        return consult
    }

    function makeRequest(consultId:string, account: Account): HttpRequest {
        return {
            params: {
                id: consultId
            },
            sessionAccount: account
        }
    }

    it('should find a registred consult', async () => {
        const account = await repositoryFactory.accountRepository().add(makeAccount())
        const consult = await makeConsult(new Account(account))
        await repositoryFactory.consultRepository().save(consult)
        const response = await sut.handle(makeRequest(consult.getState().id, new Account(account)))
        expect(response.statusCode).toEqual(200)
        expect(response.body).toStrictEqual({ message: 'Consulta desmarcada' })
    })

    it('should throw a server error', async () => {
        const response = await sut.handle(null)
        expect(response.statusCode).toEqual(500)
    })

    it('should throw for an invalid consult ID', async () => {
        const account = await repositoryFactory.accountRepository().add(makeAccount())
        const response = await sut.handle(makeRequest(faker.datatype.uuid(), new Account(account)))
        expect(response.statusCode).toEqual(404)
        expect(response.body).toEqual(new NotFoundConsultException())
    })
})

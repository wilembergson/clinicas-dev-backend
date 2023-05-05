import { generate } from "cpf";
import { faker } from "@faker-js/faker";
import { HttpRequest } from "@infra/protocols";
import { Account, Specialty } from "@domain/entities";
import { ListSpecialties } from "@domain/use-cases/specialty";
import { ListSpecialtiesController } from "@infra/controllers";
import { ListSpecialtiesUsecase } from "@application/use-cases";
import { DbRepositoryFactory } from "@infra/factories/repositories";
import { ConnectionDatabase } from "@infra/database/connection-database";

describe('ListSpecialtiesController', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: DbRepositoryFactory
    let listSpecialtiesUsecase: ListSpecialties
    let sut: ListSpecialtiesController

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new DbRepositoryFactory()
        listSpecialtiesUsecase = new ListSpecialtiesUsecase(repositoryFactory)
        sut = new ListSpecialtiesController(listSpecialtiesUsecase)
    })

    afterAll(async () => {
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

    it('should list the registred specialties', async () => {
        const specialtiesData = await repositoryFactory.specialtyRepository().getAll()
        const specialtyList = specialtiesData.map(item => {
            const specialty = new Specialty(item.getState())
            return {
                name: specialty.getState().name,
                days: specialty.getAvailableNameDays() 
            }
        })
        const account = makeAccount()
        const response = await sut.handle(makeRequest(account))
        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual(specialtyList)
    })

    /*it('should throw a server error', async () => {
        const response = await sut.handle(null)
        console.log(response)
        expect(response.statusCode).toEqual(500)
    })*/
})

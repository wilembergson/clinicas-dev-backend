import { generate } from "cpf";
import { faker } from "@faker-js/faker";
import { HttpRequest } from "@infra/protocols";
import { Account, Address } from "@domain/entities";
import { NotFoundConsultException } from "@application/exceptions";
import { FindConsultByIDValidation } from "@application/validators";
import { DbRepositoryFactory } from "@infra/factories/repositories";
import { AddConsult, FindConsultById } from "@domain/use-cases/consult";
import { ConnectionDatabase } from "@infra/database/connection-database";
import { AddConsultUsecase, FindConsultByIdUsecase} from "@application/use-cases";

describe('Find consult by id validation', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: DbRepositoryFactory
    let findConsultUsecase: FindConsultById
    let addConsult: AddConsult
    let sut: FindConsultByIDValidation

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new DbRepositoryFactory()
        findConsultUsecase = new FindConsultByIdUsecase(repositoryFactory)
        addConsult = new AddConsultUsecase(repositoryFactory)
        sut = new FindConsultByIDValidation(findConsultUsecase)
    })
    afterAll(async () => {
        await connection.clearStorage('consult')
        await connection.clearStorage('account')
        connection.close()
    })

    async function makeAccount(): Promise<Account> {
        const account = new Account({
            cpf: generate().replace(/[-.]/g, ""),
            name: faker.name.firstName(),
            birthdate: new Date('1995-01-08').toString(),
            phone: '83976884321',
            email: faker.internet.email(),
            password: faker.internet.password()
        })
        const address = new Address({
            number: faker.address.buildingNumber(),
            street: faker.address.street(),
            district: faker.address.street(),
            city: faker.address.cityName(),
            uf: 'PB'
        })
        await repositoryFactory.addressRepository().save(address)
        account.updateAddress(address)
        return account
    }

    async function createConsultData() {
        const specialties = await repositoryFactory.specialtyRepository().getAll()
        const specialty = specialties[0].getState().name
        const date = '2024-12-12'
        const account = await makeAccount()
        return {
            specialty,
            date,
            account
        }
    }
    
    function makeRequestWithBodyData(id: string, sessionAccount: Account): HttpRequest {
        return {
            params: {
                id
            },
            sessionAccount
        }
    }

    it('should not throw if a consult exists.', async () => {
        const { specialty, date, account } = await createConsultData()
        const consult = await addConsult.execute({
            specialty,
            date
        },
            account
        )
        const error = await sut.validate(makeRequestWithBodyData(consult.getState().id, account))
        expect(() => error).not.toThrow()
    })

    it('should throw if consult dont exists', async () => {
        const { account } = await createConsultData()
        const error = await sut.validate(makeRequestWithBodyData(faker.datatype.uuid(), account))
        expect(error).toEqual(new NotFoundConsultException())
    })
})

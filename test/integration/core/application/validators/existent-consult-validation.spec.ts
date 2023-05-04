import { generate } from "cpf";
import { faker } from "@faker-js/faker";
import { HttpRequest } from "@infra/protocols";
import { Account, Address } from "@domain/entities";
import { AddConsult } from "@domain/use-cases/consult";
import { DbRepositoryFactory } from "@infra/factories/repositories";
import { AlreadMarkedConsultException} from "@application/exceptions";
import { ConnectionDatabase } from "@infra/database/connection-database";
import { AddConsultUsecase, FindConsultUsecase } from "@application/use-cases";
import { ExistingConsultValidation } from "@application/validators/existing-consult-validation";

describe('Existent consult validation', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: DbRepositoryFactory
    let findConsultUsecase: FindConsultUsecase
    let addConsult: AddConsult
    let sut: ExistingConsultValidation

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new DbRepositoryFactory()
        findConsultUsecase = new FindConsultUsecase(repositoryFactory)
        addConsult = new AddConsultUsecase(repositoryFactory)
        sut = new ExistingConsultValidation(findConsultUsecase)
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

    function makeRequestWithBodyData(specialty: string, date: string, sessionAccount: Account): HttpRequest {
        return {
            body: {
                specialty,
                date
            },
            sessionAccount
        }
    }

    it('should throw if a consult alread exists.', async () => {
        const specialties = await repositoryFactory.specialtyRepository().getAll()
        const specialty = specialties[0].getState().name
        const date = '2024-12-12'
        const account = await makeAccount()
        await addConsult.execute({
            specialty,
            date
        },
            account
        )
        const error = await sut.validate(makeRequestWithBodyData(specialty, date, account))
        expect(error).toEqual(new AlreadMarkedConsultException())
    })
    
    it('should not throw if consult dont exists', async () => {
        const specialties = await repositoryFactory.specialtyRepository().getAll()
        const specialty = specialties[0].getState().name
        const date = '2024-12-12'
        const account = await makeAccount()
        const error = await sut.validate(makeRequestWithBodyData(specialty, date, account))
        expect(() => error).not.toThrow()
    })
})

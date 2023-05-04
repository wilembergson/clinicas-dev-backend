import { generate } from "cpf";
import { faker } from "@faker-js/faker";
import { HttpRequest } from "@infra/protocols";
import { Account, Address } from "@domain/entities";
import { AddConsult } from "@domain/use-cases/consult";
import { FindSpecialtyByName } from "@domain/use-cases/specialty";
import { SpecialtyDaysValidation } from "@application/validators";
import { DbRepositoryFactory } from "@infra/factories/repositories";
import { NotBelongSpecialtyDayException} from "@application/exceptions";
import { ConnectionDatabase } from "@infra/database/connection-database";
import { AddConsultUsecase, FindSpecialtyByNameUsecase } from "@application/use-cases";

describe('Specialty days validation', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: DbRepositoryFactory
    let FindSpecialtyByName: FindSpecialtyByName
    let addConsult: AddConsult
    let sut: SpecialtyDaysValidation

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new DbRepositoryFactory()
        FindSpecialtyByName = new FindSpecialtyByNameUsecase(repositoryFactory)
        addConsult = new AddConsultUsecase(repositoryFactory)
        sut = new SpecialtyDaysValidation(FindSpecialtyByName)
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

    function makeRequestWithBodyData(specialty: string, date: string): HttpRequest {
        return {
            body: {
                specialty,
                date
            }
        }
    }

    it('should throw if a consult alread exists.', async () => {
        const specialty = 'PEDIATRIA'
        const date = '2024-12-02'        
        const error = await sut.validate(makeRequestWithBodyData(specialty, date))
        expect(() => error).not.toThrow()
    })
    
    it('should not throw if consult dont exists', async () => {
        const specialty = 'PEDIATRIA'
        const date = '2024-12-01'        
        const error = await sut.validate(makeRequestWithBodyData(specialty, date))
        expect(error).toEqual(new NotBelongSpecialtyDayException(specialty))
    })
})

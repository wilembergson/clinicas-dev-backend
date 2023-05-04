import { generate } from "cpf"
import { faker } from "@faker-js/faker"
import { FindConsult } from "@domain/use-cases/consult"
import { FindConsultUsecase } from "@application/use-cases"
import { Account, Address, Consult } from "@domain/entities"
import { DbRepositoryFactory } from "@infra/factories/repositories"
import { ConnectionDatabase } from "@infra/database/connection-database"

describe('FindConsult', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: DbRepositoryFactory
    let sut: FindConsult

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new DbRepositoryFactory()
        sut = new FindConsultUsecase(repositoryFactory)
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
            district:  faker.address.street(),
            city:  faker.address.cityName(),
            uf: 'PB'
        })
        await repositoryFactory.addressRepository().save(address)
        account.updateAddress(address)
        return account
    }

    async function makeSpecialty(){
        const specialty = await repositoryFactory.specialtyRepository().getByName('PEDIATRIA')
        return specialty
    }

    async function makeConsult() {
        const consult = new Consult({date: '2024-12-12'})
        const specialty = await makeSpecialty()
        consult.addSpecialty(specialty)
        return consult
    }

    type SutInput = {
        specialty: string;
        date: string;
        accountId: string;
    }

    it('should find a consult by specialty, date and accountId', async () => {
        const account = await makeAccount()
        const consult = await makeConsult()
        consult.addAccount(account)
        await repositoryFactory.accountRepository().add(account)
        await repositoryFactory.consultRepository().save(consult)
        const input: SutInput = {
            specialty: consult.getState().specialty.getState().name,
            date: consult.getState().date,
            accountId: account.getState().id
        }
        const response = await sut.execute(input)
        expect(response).not.toBeNull()
        expect(response.getState().id).toStrictEqual(consult.getState().id)
    })
})
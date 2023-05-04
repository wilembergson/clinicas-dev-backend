import { generate } from "cpf"
import { faker } from "@faker-js/faker"
import { Account, Address, Consult, Specialty } from "@domain/entities"
import { DbRepositoryFactory } from "@infra/factories/repositories"
import { ConnectionDatabase } from "@infra/database/connection-database"
import { CancelConsult } from "@domain/use-cases/consult"
import { CancelConsultUsecase } from "@application/use-cases"

describe('CancelConsult', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: DbRepositoryFactory
    let sut: CancelConsult

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new DbRepositoryFactory()
        sut = new CancelConsultUsecase(repositoryFactory)
    })

    afterAll(async () => {
        await connection.clearStorage('consult')
        await connection.clearStorage('address')
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

    it('should cancel consult', async () => {
        const account = await makeAccount()
        const consult = await makeConsult()
        consult.addAccount(account)
        await repositoryFactory.accountRepository().add(account)
        await repositoryFactory.consultRepository().save(consult)
        const response = await sut.execute(consult.getState().id, account.getState().id)
        expect(response.getState().active).toStrictEqual(false)
    })
})
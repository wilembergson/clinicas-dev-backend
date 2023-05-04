import { generate } from "cpf"
import { faker } from "@faker-js/faker"
import { HistoricConsults, ListConsults, NextConsult } from "@domain/use-cases/consult"
import { Account, Address, Consult } from "@domain/entities"
import { HistoricConsultsUsecase, ListConsultsUsecase, NextConsultUsecase } from "@application/use-cases"
import { DbRepositoryFactory } from "@infra/factories/repositories"
import { ConnectionDatabase } from "@infra/database/connection-database"

describe('NextConsult', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: DbRepositoryFactory
    let sut: NextConsult

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new DbRepositoryFactory()
        sut = new NextConsultUsecase(repositoryFactory)
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
            district: faker.address.street(),
            city: faker.address.cityName(),
            uf: 'PB'
        })
        await repositoryFactory.addressRepository().save(address)
        account.updateAddress(address)
        return account
    }

    async function makeSpecialty(specialtyName: string) {
        const specialty = await repositoryFactory.specialtyRepository().getByName(specialtyName)
        return specialty
    }

    async function makeConsult(date: string, specialtyName: string) {
        const consult = new Consult({ date })
        const specialty = await makeSpecialty(specialtyName)
        consult.addSpecialty(specialty)
        return consult
    }

    it('should get the next consult by accountId', async () => {
        const account = await makeAccount()
        const consult1 = await makeConsult('2024-12-12', 'PEDIATRIA')
        const consult2 = await makeConsult('2024-12-13', 'ORTOPEDIA')
        consult1.addAccount(account)
        consult2.addAccount(account)
        await repositoryFactory.accountRepository().add(account)
        await repositoryFactory.consultRepository().save(consult1)
        await repositoryFactory.consultRepository().save(consult2)
        const response = await sut.execute(account)
        expect(response).not.toBeNull()
        expect(response.getState().id).toStrictEqual(consult1.getState().id)        
    })
})
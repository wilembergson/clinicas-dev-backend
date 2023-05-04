import { generate } from "cpf"
import { faker } from "@faker-js/faker"
import { Account, Address, Consult, Specialty } from "@domain/entities"
import { DbRepositoryFactory } from "@infra/factories/repositories"
import { ConnectionDatabase } from "@infra/database/connection-database"
import { FindConsultById } from "@domain/use-cases/consult"
import { FindConsultByIdUsecase } from "@application/use-cases"
import { NotFoundConsultException } from "@application/exceptions"

describe('FindConsultById', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: DbRepositoryFactory
    let sut: FindConsultById

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new DbRepositoryFactory()
        sut = new FindConsultByIdUsecase(repositoryFactory)
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

    it('should find a consult by ID', async () => {
        const account = await makeAccount()
        const consult = await makeConsult()
        consult.addAccount(account)
        await repositoryFactory.accountRepository().add(account)
        await repositoryFactory.consultRepository().save(consult)
        const response = await sut.execute(consult.getState().id, account.getState().id)
        const responseAccount = Object.assign(response.getState().account)
        expect(response.getState().id).toStrictEqual(consult.getState().id)
        expect(response.getState().date).toStrictEqual(consult.getState().date)
        expect(responseAccount.id).toStrictEqual(consult.getState().account.getState().id)
    })

    it('should return undefined if consult not belong to the account', async () => {
        const account = await makeAccount()
        const wrongAccount = await makeAccount()
        const consult = await makeConsult()
        consult.addAccount(account)
        await repositoryFactory.accountRepository().add(account)
        await repositoryFactory.accountRepository().add(wrongAccount)
        await repositoryFactory.consultRepository().save(consult)
        const response = await sut.execute(consult.getState().id, wrongAccount.getState().id)
        expect(response).toStrictEqual(undefined)
    })
})
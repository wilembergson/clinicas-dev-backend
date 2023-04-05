import { generate } from "cpf"
import { faker } from "@faker-js/faker"
import { BcryptAdapter } from "@infra/cryptografy/bcrypt-adapter"
import { ConnectionDatabase } from "@infra/database/connection-database"
import { DbRepositoryFactory } from "@infra/factories/repositories"
import { Hasher } from "@application/protocols/cryptografy/hasher"
import { AddAddressUsecase, SignupUsecase } from "@application/use-cases"
import { Account, Address } from "@domain/entities"
import { Signup } from "@domain/use-cases/signup-login/signup"
import { AddAddress } from "@domain/use-cases/address"

describe('AddAddress', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: DbRepositoryFactory
    let sut: AddAddress

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new DbRepositoryFactory()
        sut = new AddAddressUsecase(repositoryFactory)
    })

    afterAll(async () => {
        await connection.clearStorage('account')
        await connection.clearStorage('address')
        connection.close()
    })

    function makeAccount(): Account {
        return new Account({
            cpf: generate().replace(/[-.]/g, ""),
            name: faker.name.firstName(),
            birthdate: new Date('1995-01-08').toString(),
            phone: '83976884321',
            email: faker.internet.email(),
            password: faker.internet.password()
        })
    }

    function makeAddress(){
        return new Address({
            number: faker.address.buildingNumber(),
            street: faker.address.street(),
            district: faker.address.street(),
            city: faker.address.city(),
            uf: 'PB'
        })
    }

    it('should create a new account', async () => {
        const account = makeAccount()
        const address = makeAddress()
        await repositoryFactory.accountRepository().add(account)
        const response = await sut.execute(address.getStateString(), account)
        expect(response).toStrictEqual(address.getState())
    })

})
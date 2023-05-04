import { generate } from "cpf"
import { faker } from "@faker-js/faker"
import { ConnectionDatabase } from "@infra/database/connection-database"
import { DbRepositoryFactory } from "@infra/factories/repositories"
import { Account, Address } from "@domain/entities"
import { AddAddress, GetAddressById, UpdateAddress } from "@domain/use-cases/address"
import { UpdateAddressUsecase } from "@application/use-cases/address/update-address"
import { AddAddressUsecase, GetAddressByIdUsecase } from "@application/use-cases"

describe('GetAddressById', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: DbRepositoryFactory
    let addAddress: AddAddress
    let sut: GetAddressById

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new DbRepositoryFactory()
        addAddress = new AddAddressUsecase(repositoryFactory)
        sut = new GetAddressByIdUsecase(repositoryFactory)
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

    function makeAddress(id?: string){
        const _id = (id ? id : faker.datatype.uuid())
        return new Address({
            id: _id,
            number: faker.address.buildingNumber(),
            street: faker.address.street(),
            district: faker.address.street(),
            city: faker.address.city(),
            uf: 'PB'
        })
    }

    it('should update an address', async () => {
        const account = makeAccount()
        await repositoryFactory.accountRepository().add(account)
        const address = makeAddress()
        await addAddress.execute(address.getStateString(), account)
        const response = await sut.execute(address.getStateString().id)
        expect(() => response).not.toThrow()
        expect(response).toStrictEqual(address.getState())
    })

})
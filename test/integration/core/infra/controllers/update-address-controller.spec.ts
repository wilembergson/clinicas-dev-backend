import { generate } from "cpf";
import { faker } from "@faker-js/faker";
import { Account } from "@domain/entities";
import { HttpRequest } from "@infra/protocols";
import { AddAddressUsecase } from "@application/use-cases";
import { MissingParamError } from "@application/exceptions";
import { UpdateAddressController } from "@infra/controllers";
import { DbRepositoryFactory } from "@infra/factories/repositories";
import { ConnectionDatabase } from "@infra/database/connection-database";
import { UpdateAddressUsecase } from "@application/use-cases/address/update-address";
import { updateAddressValidationFactory } from "@infra/factories/validators/update-address-validation-factory";


describe('UpdateAddressController', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: DbRepositoryFactory
    let addAddressUsecase: AddAddressUsecase
    let updateAddressUsecase: UpdateAddressUsecase
    let sut: UpdateAddressController

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new DbRepositoryFactory()
        addAddressUsecase = new AddAddressUsecase(repositoryFactory)
        updateAddressUsecase = new UpdateAddressUsecase(repositoryFactory)
        sut = new UpdateAddressController(updateAddressValidationFactory(), updateAddressUsecase)
    })
    afterEach(async () => {
        await connection.clearStorage('address')
    })
    afterAll(async () => {
        await connection.clearStorage('address')
        await connection.clearStorage('account')
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
    function makeAddress(id?: string) {
        const _id = (id ? id : faker.datatype.uuid())
        return {
            id: _id,
            number: faker.address.buildingNumber(),
            street: faker.address.street(),
            district: faker.address.street(),
            city: faker.address.city(),
            uf: 'PB'
        }
    }

    function makeRequest(account: Account, address: any): HttpRequest {
        return {
            body: address,
            sessionAccount: account
        }
    }
    it('should update an address', async () => {
        const foundAccount = await repositoryFactory.accountRepository().add(makeAccount())
        const account = new Account(foundAccount)
        const address = await addAddressUsecase.execute(makeAddress(), account)
        const response = await sut.handle(makeRequest(account, makeAddress(address.id)))
        expect(response.statusCode).toEqual(200)
        expect(response.body).toStrictEqual({ message: 'Endereço atualizado' })
    })

    it('should throw a server error', async () => {
        const response = await sut.handle(null)
        expect(response.statusCode).toEqual(500)
    })

    it('should throw for invalid body params', async () => {
        const account = await repositoryFactory.accountRepository().add(makeAccount())
        const response = await sut.handle(makeRequest(new Account(account), null))
        expect(response.statusCode).toEqual(422)
        expect(response.body).toEqual(new MissingParamError(response.body.message))
    })
})

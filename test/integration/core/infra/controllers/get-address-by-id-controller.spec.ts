import { generate } from "cpf";
import { faker } from "@faker-js/faker";
import { Account } from "@domain/entities";
import { HttpRequest } from "@infra/protocols";
import { GetAddressByIdController } from "@infra/controllers";
import { NullAddressException } from "@application/exceptions";
import { DbRepositoryFactory } from "@infra/factories/repositories";
import { ConnectionDatabase } from "@infra/database/connection-database";
import { AddAddressUsecase, GetAddressByIdUsecase } from "@application/use-cases";
import { getAddressByIdValidationFactory } from "@infra/factories/validators/get-address-by-id-validation-factory";


describe('GetAddressByIdController', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: DbRepositoryFactory
    let addAddressUsecase: AddAddressUsecase
    let getAddressByIdUsecase: GetAddressByIdUsecase
    let sut: GetAddressByIdController

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new DbRepositoryFactory()
        addAddressUsecase = new AddAddressUsecase(repositoryFactory)
        getAddressByIdUsecase = new GetAddressByIdUsecase(repositoryFactory)
        sut = new GetAddressByIdController(getAddressByIdValidationFactory(), getAddressByIdUsecase)
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

    function makeRequest(account: Account): HttpRequest {
        return {
            body: {},
            sessionAccount: account
        }
    }
    it('should get the address linked to the account', async () => {
        const foundAccount = await repositoryFactory.accountRepository().add(makeAccount())
        const account = new Account(foundAccount)
        const address = await addAddressUsecase.execute(makeAddress(), account)
        const response = await sut.handle(makeRequest(account))
        expect(response.statusCode).toEqual(200)
        expect(response.body).toStrictEqual(address)
    })

    it('should throw a server error', async () => {
        const response = await sut.handle(null)
        expect(response.statusCode).toEqual(500)
    })

    it('should throw for an account with null linked address', async () => {
        const account = await repositoryFactory.accountRepository().add(makeAccount())
        const response = await sut.handle(makeRequest(new Account(account)))
        expect(response.statusCode).toEqual(403)
        expect(response.body).toEqual(new NullAddressException())
    })
})

import { generate } from "cpf";
import { faker } from "@faker-js/faker";
import { Account } from "@domain/entities";
import { HttpRequest } from "@infra/protocols";
import { JwtAdapter } from "@infra/cryptografy";
import { AddAddressController } from "@infra/controllers";
import { AddAddressUsecase } from "@application/use-cases";
import { MissingParamError } from "@application/exceptions";
import { Encrypter } from "@application/protocols/cryptografy";
import { DbRepositoryFactory } from "@infra/factories/repositories";
import { ConnectionDatabase } from "@infra/database/connection-database";
import { addAddressValidationFactory } from "@infra/factories/validators/add-address-validation-factory";


describe('AddAddressController', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: DbRepositoryFactory
    let addAddressUsecase: AddAddressUsecase
    let encrypter: Encrypter
    let sut: AddAddressController

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new DbRepositoryFactory()
        addAddressUsecase = new AddAddressUsecase(repositoryFactory)
        encrypter = new JwtAdapter(process.env.JWT_SECRET)
        sut = new AddAddressController(addAddressValidationFactory(), addAddressUsecase)
    })
    afterEach(async () => {
        await connection.clearStorage('account')
    })
    afterAll(async () => {
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
    function makeAddress() {
        return {
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
    it('should add a new address', async () => {
        const account = await repositoryFactory.accountRepository().add(makeAccount())
        const response = await sut.handle(makeRequest(new Account(account), makeAddress()))
        expect(response.statusCode).toEqual(201)
        expect(response.body).toStrictEqual({ message: 'Endereço salvo' })
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

import { generate } from "cpf";
import { faker } from "@faker-js/faker";
import { ConnectionDatabase } from "@infra/database/connection-database";
import { DbRepositoryFactory } from "@infra/factories/repositories";
import { FindAccountByEmailUsecase } from "@application/use-cases";
import { NotFoundEmailValidation } from "@application/validators";
import { AlreadAddressRegistredException, NotFoundEmailException } from "@application/exceptions";
import { HttpRequest } from "@infra/protocols";
import { Account, Address } from "@domain/entities";
import { FindAccountByEmail } from "@domain/use-cases/account";
import { AddressRegistredValidation } from "@application/validators/address-registred-validation";

describe('Address alread registred validation', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: DbRepositoryFactory
    let sut: AddressRegistredValidation

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new DbRepositoryFactory()
        sut = new AddressRegistredValidation()
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
        return new Address({
            number: faker.address.buildingNumber(),
            street: faker.address.street(),
            district: faker.address.street(),
            city: faker.address.city(),
            uf: 'PB'
        })
    }

    function makeRequestWithSessionAccount(account: Account): HttpRequest {
        return {
            body: {},
            sessionAccount: account
        }
    }
    it('should not throw with an account without a linked address', async () => {
        const account = makeAccount()
        await repositoryFactory.accountRepository().add(account)
        const error = await sut.validate(makeRequestWithSessionAccount(account))
        expect(error).toBeFalsy()
    })

    it('should throw to an account with a linked address', async () => {
        const address = makeAddress()
        const savedccount = await repositoryFactory.accountRepository().add(makeAccount())
        const account = new Account(savedccount)
        account.updateAddress(address)
        const error = await sut.validate(makeRequestWithSessionAccount(account))
        expect(error).toEqual(new AlreadAddressRegistredException())
    })
})

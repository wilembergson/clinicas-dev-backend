import { generate } from "cpf";
import { faker } from "@faker-js/faker";
import { HttpRequest } from "@infra/protocols";
import { Account, Address } from "@domain/entities";
import { NotBelongAddressException} from "@application/exceptions";
import { DbRepositoryFactory } from "@infra/factories/repositories";
import { ConnectionDatabase } from "@infra/database/connection-database";
import { BelongAddressValidation } from "@application/validators/Belong-address-validation";

describe('Belong Address validation', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: DbRepositoryFactory
    let sut: BelongAddressValidation

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new DbRepositoryFactory()
        sut = new BelongAddressValidation()
    })
    afterEach(async () => {
        await connection.clearStorage('account')
        await connection.clearStorage('address')
    })
    afterAll(async () => {
        await connection.clearStorage('account')
        await connection.clearStorage('address')
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
            id: faker.datatype.uuid(),
            number: faker.address.buildingNumber(),
            street: faker.address.street(),
            district: faker.address.street(),
            city: faker.address.city(),
            uf: 'PB'
        })
    }

    function makeRequestWithSessionAccount(account: Account, address: Address): HttpRequest {
        return {
            body: address.getStateString(),
            sessionAccount: account
        }
    }
    it('should not throw to an account with the related linked address', async () => {
        const address = makeAddress()
        const savedccount = await repositoryFactory.accountRepository().add(makeAccount())
        const account = new Account(savedccount)
        account.updateAddress(address)
        const error = await sut.validate(makeRequestWithSessionAccount(account, address))
        expect(error).toBeFalsy()
    })

    it('should throw to an account without the related linked address', async () => {
        const address = makeAddress()
        const savedccount = await repositoryFactory.accountRepository().add(makeAccount())
        const account = new Account(savedccount)
        account.updateAddress(address)
        const error = await sut.validate(makeRequestWithSessionAccount(account, makeAddress()))
        expect(error).toEqual(new NotBelongAddressException())
    })
})

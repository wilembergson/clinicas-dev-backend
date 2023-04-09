import { generate } from "cpf";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import { ExpressApp } from "@infra/config";
import { Account, Address } from "@domain/entities";
import { JwtAdapter } from "@infra/cryptografy";
import { Encrypter } from "@application/protocols/cryptografy";
import { ConnectionDatabase } from "@infra/database/connection-database";
import { AddAddress } from "@domain/use-cases/address";
import { AddAddressUsecase } from "@application/use-cases";
import { DbRepositoryFactory } from "@infra/factories/repositories";

describe('PUT /address', () => {
    const app = supertest(new ExpressApp().getInstance)
    const connection = new ConnectionDatabase()
    const encrypter: Encrypter = new JwtAdapter(process.env.JWT_SECRET)
    const repositoryFactory = new DbRepositoryFactory()
    const addAddressUsercase: AddAddress = new AddAddressUsecase(repositoryFactory)

    function makeAddress(id?: string) {
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

    function makeAccount() {
        return new Account({
            id: faker.datatype.uuid(),
            cpf: generate().replace(/[-.]/g, ""),
            name: faker.name.firstName(),
            birthdate: new Date('1995-01-08').toString(),
            phone: '83976884321',
            email: faker.internet.email(),
            password: faker.internet.password()
        })
    }

    async function makeRequestBody(): Promise<any> {
        return {
            number: faker.address.buildingNumber(),
            street: faker.address.street(),
            district: faker.address.street(),
            city: faker.address.city(),
            uf: 'PB'
        }
    }

    afterEach(async () => {
        await connection.clearStorage('account')
    })
    afterAll(async () => {
        await connection.clearStorage('account')
        await connection.clearStorage('address')
        await connection.close()
    })

    it('should update a registred address', async () => {
        const account = makeAccount()
        await connection.getConnection().account.create({
            data: account.getState()
        })
        const address = makeAddress()
        await addAddressUsercase.execute(address.getStateString(), account)
        const updateAddress = makeAddress(address.getState().id)
        const token = await encrypter.encrypt({ cpf: account.getState().cpf, name: account.getState().name })
        const response = await app.put("/address").set('authorization', token).send(updateAddress.getStateString())
        expect(response.statusCode).toEqual(200)
    })

    it('should throw to invalid token', async () => {
        const response = await app.put("/address").set('authorization', null).send(await makeRequestBody())
        expect(response.statusCode).toEqual(401)
    })
})
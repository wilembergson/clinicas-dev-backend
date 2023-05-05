import { generate } from "cpf";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import { ExpressApp } from "@infra/config";
import { Account } from "@domain/entities";
import { JwtAdapter } from "@infra/cryptografy";
import { Encrypter } from "@application/protocols/cryptografy";
import { ConnectionDatabase } from "@infra/database/connection-database";

describe('POST /address', () => {
    const app = supertest(new ExpressApp().getInstance)
    const connection = new ConnectionDatabase()
    const encrypter: Encrypter = new JwtAdapter(process.env.JWT_SECRET)

    async function makeRequestBody(): Promise<any> {
        return {
            number: faker.address.buildingNumber(),
            street: faker.address.street(),
            district: faker.address.street(),
            city: faker.address.city(),
            uf: 'PB'
        }
    }
    async function makeInvalidRequest(): Promise<any> {
        return {
            cpf: faker.datatype.string(11)
        }
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

    afterEach(async () => {
        await connection.clearStorage('account')
    })
    afterAll(async () => {
        await connection.clearStorage('account')
        await connection.clearStorage('address')
        await connection.close()
    })

    it('should be able to add a new address', async () => {
        const account = makeAccount().getState()
        await connection.getConnection().account.create({
            data: account
        })
        const token = await encrypter.encrypt({ cpf: account.cpf, name: account.name })
        const response = await app.post("/address").set('authorization', token).send(await makeRequestBody())
        expect(response.statusCode).toEqual(201)
    }, 20000)

    it('should throw to invalid token', async () => {
        const response = await app.post("/address").set('authorization', null).send(await makeRequestBody())
        expect(response.statusCode).toEqual(401)
    })
})
import { generate } from "cpf";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import { ExpressApp } from "@infra/config";
import { ConnectionDatabase } from "@infra/database/connection-database";

describe('POST /signup', () => {
    const app = supertest(new ExpressApp().getInstance)
    const connection = new ConnectionDatabase()

    async function makeRequest(): Promise<any> {
        return {
            cpf: generate().replace(/[-.]/g, ""),
            name: faker.name.firstName(),
            birthdate: new Date('1995-01-08').toString(),
            phone: '83976884321',
            email: faker.internet.email(),
            password: faker.internet.password()
        }
    }
    async function makeInvalidRequest(): Promise<any> {
        return {
            cpf: faker.datatype.string(11)
        }
    }
    
    afterEach(async () => {
        await connection.clearStorage('account')
    })
    afterAll(async () => {
        await connection.clearStorage('account')
        await connection.close()
    })

    it('[200]:should be able to add a new account', async () => {
        const response = await app.post("/signup").send(await makeRequest())
        expect(response.statusCode).toEqual(201)
    }, 10000)

    it('[400]:should throw to add an invalid cpf', async () => {
        const response = await app.post("/signup").send(await makeInvalidRequest())
        expect(response.statusCode).toEqual(422)
    })
})
import { generate } from "cpf";
import { hash } from "bcrypt"
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import { ExpressApp } from "@infra/config";
import { ConnectionDatabase } from "@infra/database/connection-database";
import { Account } from "@domain/entities";

type LoginType = {
    email: string,
    password: string
}

async function makeLogin(): Promise<LoginType>{
    return {
        email: faker.internet.email(),
        password: faker.internet.password()
    }
}

async function makeAccount(email: string, password: string): Promise<Account> {
    const hashedPassword = await hash(password, 10)
    return new Account({
        cpf: generate().replace(/[-.]/g, ""),
        name: faker.name.firstName(),
        birthdate: new Date('1995-01-08').toString(),
        phone: '83976884321',
        email,
        password: hashedPassword
    })
}

async function makeInvalidRequest(): Promise<any> {
    return {
        cpf: faker.datatype.string(11)
    }
}

describe('GET /login', () => {
    const app = supertest(new ExpressApp().getInstance)
    const connection = new ConnectionDatabase()

    afterEach(async () => {
        await connection.clearStorage('account')
    })
    afterAll(async () => {
        await connection.clearStorage('account')
        await connection.close()
    })

    it('[200]:should be able to make login', async () => {
        const login = await makeLogin()
        const account = await makeAccount(login.email, login.password)
        const res = await connection.getConnection().account.create({
            data: account.getState()
        })
        const response = await app.get("/login").send(login)
        expect(response.statusCode).toEqual(200)
    })

    it('[401]:should be able to make login', async () => {
        const login = await makeLogin()
        const account = await makeAccount(login.email, login.password)
        const res = await connection.getConnection().account.create({
            data: account.getState()
        })
        const response = await app.get("/login").send({
            email: login.email,
            password: faker.internet.password()
        })
        expect(response.statusCode).toEqual(401)
    })

    it('[404]:should throw when dont find the email', async () => {
        const login = await makeLogin()
        const response = await app.get("/login").send(login)
        expect(response.statusCode).toEqual(404)
    })
})

import { generate } from "cpf";
import jwt from "jsonwebtoken";
import { faker } from "@faker-js/faker";
import { HttpRequest } from "@infra/protocols";
import { JwtAdapter } from "@infra/cryptografy";
import { Account, Address } from "@domain/entities";
import { AuthMiddleware } from "@application/middlewares";
import { LoadAccountByToken } from "@domain/use-cases/account";
import { LoadAccountByTokenUsecase } from "@application/use-cases";
import { DbRepositoryFactory } from "@infra/factories/repositories";
import { ConnectionDatabase } from "@infra/database/connection-database";
import { Decrypter, Encrypter } from "@application/protocols/cryptografy";
import { AccessDeniedException, ExpiredTokenException, ServerException } from "@application/exceptions";

let connection: ConnectionDatabase
let repositoryFactory: DbRepositoryFactory
let decrypter: Decrypter
let encrypter: Encrypter
let loadAccountByToken: LoadAccountByToken
let sut: AuthMiddleware

beforeAll(() => {
    connection = new ConnectionDatabase()
    repositoryFactory = new DbRepositoryFactory()
    decrypter = new JwtAdapter(process.env.JWT_SECRET)
    encrypter = new JwtAdapter(process.env.JWT_SECRET)
    loadAccountByToken = new LoadAccountByTokenUsecase(decrypter, repositoryFactory)
    sut = new AuthMiddleware(loadAccountByToken, decrypter)
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
function generateExpiredToken() {
    return jwt.sign(
        { exp: Math.floor(Date.now() / 1000) - 60 },
        process.env.JWT_SECRET
    )
}

function makeRequest(token: string): HttpRequest {
    return {
        body: {},
        headers: {
            authorization: token
        }
    }
}

describe('AuthMiddleware', () => {
    it('should return the logged account by the token', async () => {
        const account = await repositoryFactory.accountRepository().add(makeAccount())
        const token = await encrypter.encrypt({ cpf: account.cpf, name: account.name })
        const response = await sut.handle(makeRequest(token))
        expect(response.statusCode).toEqual(200)
        expect(response.body.getState()).toStrictEqual(account)
    })

    it('should throw for null token', async () => {
        const response = await sut.handle(makeRequest(null))
        expect(response.statusCode).toEqual(401)
        expect(response.body).toEqual(new AccessDeniedException())
    })

    it('should throw when token expire', async () => {
        const token = generateExpiredToken()
        const response = await sut.handle(makeRequest(token))
        expect(response.statusCode).toEqual(401)
        expect(response.body).toEqual(new ExpiredTokenException(response.body))
    })

    it('should throw to wrong token format', async () => {
        const response = await sut.handle(makeRequest(faker.datatype.string()))
        expect(response.statusCode).toEqual(401)
        expect(response.body).toEqual(new AccessDeniedException())
    })

    it('should throw server error', async () => {
        const token = generateExpiredToken()
        const response = await sut.handle(null)
        expect(response.statusCode).toEqual(500)
        expect(response.body).toEqual(new ServerException(response.body))
    })
})

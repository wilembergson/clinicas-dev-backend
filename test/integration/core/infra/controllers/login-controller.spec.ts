import { generate } from "cpf";
import { faker } from "@faker-js/faker";
import { Account } from "@domain/entities";
import { HttpRequest } from "@infra/protocols";
import { LoginController } from "@infra/controllers";
import { LoginUsecase } from "@application/use-cases";
import { ExistsEmailException, InvalidEmailException, InvalidPasswordException, MissingParamError, NotFoundEmailException } from "@application/exceptions";
import { BcryptAdapter, JwtAdapter } from "@infra/cryptografy";
import { DbRepositoryFactory } from "@infra/factories/repositories";
import { ConnectionDatabase } from "@infra/database/connection-database";
import { Encrypter, HashComparer, Hasher } from "@application/protocols/cryptografy";
import { loginValidationFactory } from "@infra/factories/validators/login-validation-factory";
import { ExistentCpfValidation } from "@application/validators";

describe('LoginController', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: DbRepositoryFactory
    let hashComparer: HashComparer
    let hasher: Hasher
    let encrypter: Encrypter
    let loginUsecase: LoginUsecase
    let sut: LoginController

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new DbRepositoryFactory()
        hashComparer = new BcryptAdapter(10)
        hasher = new BcryptAdapter(10)
        encrypter = new JwtAdapter(process.env.JWT_SECRET)
        loginUsecase = new LoginUsecase(hashComparer, encrypter, repositoryFactory)
        sut = new LoginController(loginValidationFactory(), loginUsecase)
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
            password:faker.internet.password()
        })
        return account
    }

    function makeRequest(email: string, password: string): HttpRequest {
        return {
            body: {
                email,
                password
            }
        }
    }

    it('should sucess login', async () => {
        const account = makeAccount()
        const hashedPassword = await hasher.hash(account.getState().password)
        const accountData = Object.assign({}, account.getState(), {password: hashedPassword})
        await repositoryFactory.accountRepository().add(new Account(accountData))
        const response = await sut.handle(makeRequest(account.getState().email, account.getState().password))
        expect(response.statusCode).toEqual(200)
        expect(response.body).toHaveProperty('token')
    })

    it('should sucess login', async () => {
        const account = makeAccount()
        const hashedPassword = await hasher.hash(account.getState().password)
        const accountData = Object.assign({}, account.getState(), {password: hashedPassword})
        await repositoryFactory.accountRepository().add(new Account(accountData))
        const response = await sut.handle(makeRequest(account.getState().email, faker.internet.password()))
        expect(response.statusCode).toEqual(401)
        expect(response.body).toEqual(new InvalidPasswordException())
    })

    it('should throw a server error', async () => {
        const response = await sut.handle(null)
        expect(response.statusCode).toEqual(500)
    })

    it('should throw for an unregisted email', async () => {
        const response = await sut.handle(makeRequest(faker.internet.email(), faker.internet.password()))
        expect(response.statusCode).toEqual(404)
        expect(response.body).toEqual(new NotFoundEmailException())
    })

    it('should throw for an invalid email format', async () => {
        const response = await sut.handle(makeRequest(faker.datatype.string(), faker.internet.password()))
        expect(response.statusCode).toEqual(422)
        expect(response.body).toEqual(new InvalidEmailException())
    })

    it('should throw if is missing params', async () => {
        const response = await sut.handle(makeRequest('', ''))
        expect(response.statusCode).toEqual(422)
        expect(response.body).toEqual(new MissingParamError(response.body.message))
    })
})

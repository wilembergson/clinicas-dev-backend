import { generate } from "cpf";
import { faker } from "@faker-js/faker";
import { Account } from "@domain/entities";
import { HttpRequest } from "@infra/protocols";
import { BcryptAdapter } from "@infra/cryptografy";
import { SignupController } from "@infra/controllers";
import { SignupUsecase } from "@application/use-cases";
import { MissingParamError } from "@application/exceptions";
import { Hasher } from "@application/protocols/cryptografy";
import { DbRepositoryFactory } from "@infra/factories/repositories";
import { ConnectionDatabase } from "@infra/database/connection-database";
import { signupValidationFactory } from "@infra/factories/validators/signup-validation-factory";

describe('SignupController', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: DbRepositoryFactory
    let hasher: Hasher
    let signupUsecase: SignupUsecase
    let sut: SignupController

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new DbRepositoryFactory()
        hasher = new BcryptAdapter(10)
        signupUsecase = new SignupUsecase(repositoryFactory, hasher)
        sut = new SignupController(signupValidationFactory(), signupUsecase)
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

    function makeRequest(account: Account.InformationsWithPassword): HttpRequest {
        return {
            body: account
        }
    }

    it('should create a new account', async () => {
        const account = makeAccount().getInformationsWithPassword()
        const response = await sut.handle(makeRequest(new Account(account).getInformationsWithPassword()))
        expect(response.statusCode).toEqual(201)
        expect(response.body).toStrictEqual({ message: 'Account created.' })
    })

    it('should throw a server error', async () => {
        const response = await sut.handle(null)
        expect(response.statusCode).toEqual(500)
    })

    it('should throw for invalid body params', async () => {
        const account = await repositoryFactory.accountRepository().add(makeAccount())
        const response = await sut.handle(makeRequest(null))
        expect(response.statusCode).toEqual(422)
        expect(response.body).toEqual(new MissingParamError(response.body.message))
    })
})

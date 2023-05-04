import { generate } from "cpf"
import { faker } from "@faker-js/faker"
import { BcryptAdapter } from "@infra/cryptografy/bcrypt-adapter"
import { ConnectionDatabase } from "@infra/database/connection-database"
import { DbRepositoryFactory } from "@infra/factories/repositories"
import { LoginUsecase, SignupUsecase } from "@application/use-cases"
import { Account } from "@domain/entities"
import { Encrypter, HashComparer, Hasher } from "@application/protocols/cryptografy"
import { JwtAdapter } from "@infra/cryptografy"
import { Login, Signup } from "@domain/use-cases/signup-login"

describe('Login', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: DbRepositoryFactory
    let comparer: HashComparer
    let hasher: Hasher
    let encrypter: Encrypter
    let signup: Signup
    let sut: Login

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new DbRepositoryFactory()
        encrypter = new JwtAdapter(process.env.JWT_SECRET)
        comparer = new BcryptAdapter(10)
        hasher = new BcryptAdapter(10)
        signup = new SignupUsecase(repositoryFactory, hasher)
        sut = new LoginUsecase(comparer, encrypter, repositoryFactory)
    })

    afterAll(async () => {
        await connection.clearStorage('account')
        connection.close()
    })

    function makeAccount(email: string, password: string): Account {
        return new Account({
            cpf: generate().replace(/[-.]/g, ""),
            name: faker.name.firstName(),
            birthdate: new Date('1995-01-08').toString(),
            phone: '83976884321',
            email,
            password
        })
    }

    function makeLogin() {
        return {
            email: faker.internet.email(),
            password: faker.internet.password()
        }
    }

    it('should login on an account', async () => {
        const login = makeLogin()
        const account = makeAccount(login.email, login.password)
        await signup.execute(account.getState())
        const response = await sut.execute(login)
        expect(response).toBeTruthy()
    })


})
import { generate } from "cpf"
import { faker } from "@faker-js/faker"
import { BcryptAdapter } from "@infra/cryptografy/bcrypt-adapter"
import { ConnectionDatabase } from "@infra/database/connection-database"
import { DbRepositoryFactory } from "@infra/factories/repositories"
import { Hasher } from "@application/protocols/cryptografy/hasher"
import { SignupUsecase } from "@application/use-cases"
import { Account } from "@domain/entities"
import { Signup } from "@domain/use-cases/signup-login/signup"

describe('Signup', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: DbRepositoryFactory
    let hasher: Hasher
    let sut: Signup

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new DbRepositoryFactory()
        hasher = new BcryptAdapter(10)
        sut = new SignupUsecase(repositoryFactory, hasher)
    })

    afterAll(async () => {
        await connection.clearStorage('account')
        connection.close()
    })

    function makeAccount(): Account {
        return new Account({
            cpf: generate().replace(/[-.]/g, ""),
            name: faker.name.firstName(),
            birthdate: new Date('1995-01-08').toString(),
            phone: '83976884321',
            email: faker.internet.email(),
            password: faker.internet.password()
        })

    }

    it('should create a new account', async () => {
        const account = makeAccount()
        const response = await sut.execute(account.getState())
        expect(response).toStrictEqual(account.getInformations())
        expect(response).toHaveProperty('cpf')
        expect(response).toHaveProperty('name')
        expect(response).toHaveProperty('birthdate')
        expect(response).toHaveProperty('phone')
        expect(response).toHaveProperty('email')
    })

    it('should create a new account', async () => {
        const account = makeAccount()
        await sut.execute(account.getState())
        const response = await sut.execute(account.getState())
        expect(response).toBeNull()
    })
})
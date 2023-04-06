import { generate } from "cpf";
import { faker } from "@faker-js/faker";
import { ConnectionDatabase } from "@infra/database/connection-database";
import { DbRepositoryFactory } from "@infra/factories/repositories";
import { InvalidPasswordException } from "@application/exceptions";
import { HashComparer } from "@application/protocols/cryptografy";
import { PasswordValidation } from "@application/validators";
import { signupFactory } from "@infra/factories/use-cases";
import { BcryptAdapter } from "@infra/cryptografy";
import { HttpRequest } from "@infra/protocols";
import { Account } from "@domain/entities";

describe('Password validation', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: DbRepositoryFactory
    let hashComparer: HashComparer
    let sut: PasswordValidation
    const signin = signupFactory()

    type loginType = {
        email: string,
        password: string
    }

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new DbRepositoryFactory()
        hashComparer = new BcryptAdapter(10)
        sut = new PasswordValidation(hashComparer, repositoryFactory)
    })
    afterEach(async () => {
        await connection.clearStorage('account')
    })
    afterAll(async () => {
        await connection.clearStorage('account')
        connection.close()
    })

    function generateLogin(): loginType {
        return {
            email: faker.internet.email(),
            password: faker.internet.password()
        }
    }

    function addNewAccount(email: string, password: string): Account {
        const account = new Account({
            id: faker.datatype.uuid(),
            cpf: generate().replace(/[-.]/g, ""),
            name: faker.name.firstName(),
            birthdate: new Date('1995-01-08').toString(),
            phone: '83976884321',
            email,
            password
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
    it('password should be ok', async () => {
        const login = generateLogin()
        const acc = addNewAccount(login.email, login.password)
        await signin.execute(acc.getInformationsWithPassword())
        const error = await sut.validate(makeRequest(login.email, login.password))
        expect(error).toBeFalsy()
    })

    it('should throw trying match an unregistred password', async () => {
        const login = generateLogin()
        const acc = addNewAccount(login.email, login.password)
        await signin.execute(acc.getInformationsWithPassword())
        const error = await sut.validate(makeRequest(login.email, faker.internet.password()))
        expect(error).toEqual(new InvalidPasswordException())
    })

})

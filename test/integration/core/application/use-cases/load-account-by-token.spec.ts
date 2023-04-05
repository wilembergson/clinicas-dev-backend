import { generate } from "cpf"
import { faker } from "@faker-js/faker"
import { Account } from "@domain/entities"
import { JwtAdapter } from "@infra/cryptografy"
import { LoadAccountByToken } from "@domain/use-cases/account"
import { LoadAccountByTokenUsecase } from "@application/use-cases"
import { DbRepositoryFactory } from "@infra/factories/repositories"
import { ConnectionDatabase } from "@infra/database/connection-database"
import { Decrypter, Encrypter } from "@application/protocols/cryptografy"

describe('LoadAccountByToken', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: DbRepositoryFactory
    let decrypter: Decrypter
    let encrypter: Encrypter
    let sut: LoadAccountByToken

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new DbRepositoryFactory()
        decrypter = new JwtAdapter(process.env.JWT_SECRET)
        encrypter = new JwtAdapter(process.env.JWT_SECRET)
        sut = new LoadAccountByTokenUsecase(decrypter, repositoryFactory)
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
    
    async function generateToken(account: Account){
        return await encrypter.encrypt({
            cpf: account.getInformations().cpf,
            name: account.getInformations().name
        })
    } 

    it('should load an account by token', async () => {
        const account = makeAccount()
        await repositoryFactory.accountRepository().add(account)
        const token = await generateToken(account)
        const response = await sut.execute(token)
        expect(response.getInformations()).toStrictEqual(account.getInformations())
    })
})
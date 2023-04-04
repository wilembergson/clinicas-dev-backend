import { generate } from "cpf"
import { faker } from "@faker-js/faker"
import { ConnectionDatabase } from "@infra/database/connection-database"
import { DbRepositoryFactory } from "@infra/factories/repositories"
import { FindAccountByCpfUsecase, LoadAccountByTokenUsecase } from "@application/use-cases"
import { Account } from "@domain/entities"
import { FindAccountByCpf, LoadAccountByToken } from "@domain/use-cases/account"
import { Decrypter, Encrypter } from "@application/protocols/cryptografy"
import { JwtAdapter } from "@infra/cryptografy"

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
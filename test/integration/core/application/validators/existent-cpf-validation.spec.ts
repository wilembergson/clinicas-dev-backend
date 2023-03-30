import { faker } from "@faker-js/faker";
import { HttpRequest } from "../../../../../src/core/infra/protocols";
import { ExistsCpfException } from "../../../../../src/core/application/exceptions";
import { ExistentCpfValidation } from "../../../../../src/core/application/validators";
import { ConnectionDatabase } from "../../../../../src/core/infra/database/connection-database";
import { FindAccountByCpfUsecase } from "../../../../../src/core/application/use-cases";
import { FindAccountByCpf } from "../../../../../src/core/domain/use-cases/find-account-by-cpf";
import { DbRepositoryFactory } from "../../../../../src/core/infra/factories/repositories";
import { generate } from "cpf";
import { Account } from "../../../../../src/core/domain/entities";


let connection: ConnectionDatabase
let repositoryFactory: DbRepositoryFactory
let findAccountByCpfUsecase: FindAccountByCpf
let sut: ExistentCpfValidation

beforeAll(() => {
    connection = new ConnectionDatabase()
    repositoryFactory = new DbRepositoryFactory()
    findAccountByCpfUsecase = new FindAccountByCpfUsecase(repositoryFactory)
    sut = new ExistentCpfValidation(findAccountByCpfUsecase)
})
afterEach(async () => {
    await connection.clearStorage('account')
})
afterAll(async () => {
    await connection.clearStorage('account')
    connection.close()
})

function generateCpf(): string {
    return generate().replace(/[-.]/g, "")
}

function addNewAccount(cpf: string): Account.State {
    const account = new Account({
        id: faker.datatype.uuid(),
        cpf,
        name: faker.name.firstName(),
        birthdate: new Date('1995-01-08').toString(),
        phone: '83976884321',
        email: faker.internet.email(),
        password: faker.internet.password()
    })
    return account.getState()
}

function makeRequestWithBodyData(cpf: string): HttpRequest {
    return {
        body: addNewAccount(cpf)
    }
}

function makeRequestWithParamsData(cpf: string): HttpRequest {
    return {
        body: {},
        params: {
            cpf
        }
    }
}

describe('Existent account validation', () => {
    it('should find a registred account passing data body', async () => {
        const cpf = generateCpf()
        await connection.getConnection().account.create({
            data: addNewAccount(cpf)
        })
        const error = await sut.validate(makeRequestWithBodyData(cpf))
        expect(error).toEqual(new ExistsCpfException())
    })

    it('should find a registred cpf passing data params', async () => {
        const cpf = generateCpf()
        await connection.getConnection().account.create({
            data: addNewAccount(cpf)
        })
        const error = await sut.validate(makeRequestWithParamsData(cpf))
        expect(error).toEqual(new ExistsCpfException())
    })

    it('should find a registred cpf passing data body', async () => {
        const cpf = generateCpf()
        const error = await sut.validate(makeRequestWithBodyData(cpf))
        expect(error).toBeFalsy()
    })
})

import { generate } from "cpf";
import { faker } from "@faker-js/faker";
import { Account } from "@domain/entities";
import { HttpRequest } from "@infra/protocols";
import { ExistsEmailException, NotFoundSpecialtyException } from "@application/exceptions";
import { ExistentSpecialtyValidation } from "@application/validators";
import { FindSpecialtyByNameUsecase } from "@application/use-cases";
import { DbRepositoryFactory } from "@infra/factories/repositories";
import { ConnectionDatabase } from "@infra/database/connection-database";
import { FindSpecialtyByName } from "@domain/use-cases/specialty";

describe('Existent specialty validation', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: DbRepositoryFactory
    let findSpecialtyByNameUsecase: FindSpecialtyByName
    let sut: ExistentSpecialtyValidation

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new DbRepositoryFactory()
        findSpecialtyByNameUsecase = new FindSpecialtyByNameUsecase(repositoryFactory)
        sut = new ExistentSpecialtyValidation(findSpecialtyByNameUsecase)
    })
    afterEach(async () => {
        await connection.clearStorage('account')
    })
    afterAll(async () => {
        await connection.clearStorage('account')
        connection.close()
    })

    function addNewAccount(email: string): Account.State {
        const account = new Account({
            id: faker.datatype.uuid(),
            cpf: generate().replace(/[-.]/g, ""),
            name: faker.name.firstName(),
            birthdate: new Date('1995-01-08').toString(),
            phone: '83976884321',
            email,
            password: faker.internet.password()
        })
        return account.getState()
    }

    function makeRequestWithBodyData(specialty: string): HttpRequest {
        return {
            body: {
                specialty
            }
        }
    }
    
    it('should find a registred account passing data body', async () => {
        const list = await connection.getConnection().specialty.findMany({})
        const selectedSpecialty = list[0]
        const error = await sut.validate(makeRequestWithBodyData(selectedSpecialty.name))
        expect(() => error).not.toThrow()
    })

    it('should throw if a specialty dont exists.', async () => {        
        const error = await sut.validate(makeRequestWithBodyData(faker.address.city()))
        expect(error).toEqual(new NotFoundSpecialtyException())
    })
})

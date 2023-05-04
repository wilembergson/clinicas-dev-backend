import { FindSpecialtyByNameUsecase, ListSpecialtiesUsecase } from "@application/use-cases"
import { DbRepositoryFactory } from "@infra/factories/repositories"
import { FindSpecialtyByName, ListSpecialties } from "@domain/use-cases/specialty"

describe('FindSpecialtyByName', () => {
    let repositoryFactory: DbRepositoryFactory
    let sut: FindSpecialtyByName

    beforeAll(() => {
        repositoryFactory = new DbRepositoryFactory()
        sut = new FindSpecialtyByNameUsecase(repositoryFactory)
    })

    it('should list all specialties', async () => {
        const foundSpecialty = await repositoryFactory.specialtyRepository().getAll()
        const response = await sut.execute(foundSpecialty[0].getState().name)
        expect(response).not.toBeNull()
        expect(response.getState()).toStrictEqual(foundSpecialty[0].getState())
    })
})
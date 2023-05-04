import { ListSpecialtiesUsecase } from "@application/use-cases"
import { DbRepositoryFactory } from "@infra/factories/repositories"
import { ListSpecialties } from "@domain/use-cases/specialty"

describe('ListSpecialties', () => {
    let repositoryFactory: DbRepositoryFactory
    let sut: ListSpecialties

    beforeAll(() => {
        repositoryFactory = new DbRepositoryFactory()
        sut = new ListSpecialtiesUsecase(repositoryFactory)
    })

    it('should list all specialties', async () => {
        const response = await sut.execute()
        expect(response).not.toBeNull()
        expect(response.length).toBeGreaterThan(0)
    })
})
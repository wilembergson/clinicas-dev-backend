import { Specialty } from "@domain/entities"
import { RepositoryFactory } from "@domain/factories"
import { SpecialtyRepository } from "@domain/repositories"
import { ListSpecialties } from "@domain/use-cases/specialty"

export class ListSpecialtiesUsecase implements ListSpecialties {
    private readonly specialtyRepository: SpecialtyRepository

    constructor(
        repositoryFactory: RepositoryFactory
    ) {
        this.specialtyRepository = repositoryFactory.specialtyRepository()
    }
    async execute(): Promise<ListSpecialties.Output[]> {
        try {
            const specialties = await this.specialtyRepository.getAll()
            const result = specialties.map(item => ({
                name: item.getState().name,
                days: item.getAvailableNameDays()
            }))
            return result
        } catch (error) {
            console.error(error)
        }
    }

}
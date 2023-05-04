import { Specialty } from "@domain/entities"
import { RepositoryFactory } from "@domain/factories"
import { SpecialtyRepository } from "@domain/repositories"
import { FindSpecialtyByName } from "@domain/use-cases/specialty"

export class FindSpecialtyByNameUsecase implements FindSpecialtyByName {
    private readonly specialtyRepository: SpecialtyRepository

    constructor(
        repositoryFactory: RepositoryFactory
    ) {
        this.specialtyRepository = repositoryFactory.specialtyRepository()
    }
    async execute(name: string): Promise<Specialty> {
        try {
            return await this.specialtyRepository.getByName(name)
        } catch (error) { }
    }

}
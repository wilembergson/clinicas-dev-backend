import { ListSpecialtiesUsecase } from "@application/use-cases"
import { DbRepositoryFactory } from "../../repositories"

export function listSpecialtiesFactory() {
    const repositoryFactory = new DbRepositoryFactory()
    return new ListSpecialtiesUsecase(repositoryFactory)
}
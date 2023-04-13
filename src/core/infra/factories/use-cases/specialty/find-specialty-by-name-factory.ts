import { FindAccountByCpfUsecase, FindSpecialtyByNameUsecase } from "@application/use-cases"
import { DbRepositoryFactory } from "../../repositories"

export function findSpecialtyByNameFactory() {
    const repositoryFactory = new DbRepositoryFactory()
    return new FindSpecialtyByNameUsecase(repositoryFactory)
}
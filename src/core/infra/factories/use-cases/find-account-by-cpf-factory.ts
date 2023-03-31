import { FindAccountByCpfUsecase } from "@application/use-cases"
import { DbRepositoryFactory } from "../repositories"

export function findAccountByCpfFactory() {
    const repositoryFactory = new DbRepositoryFactory()
    return new FindAccountByCpfUsecase(repositoryFactory)
}
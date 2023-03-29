import { FindAccountByCpfUsecase } from "../../../application/use-cases/index"
import { DbRepositoryFactory } from "../repositories"

export function findAccountByCpfFactory() {
    const repositoryFactory = new DbRepositoryFactory()
    return new FindAccountByCpfUsecase(repositoryFactory)
}
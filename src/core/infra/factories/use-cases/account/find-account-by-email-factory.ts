import { FindAccountByEmailUsecase } from "@application/use-cases"
import { DbRepositoryFactory } from "../../repositories"

export function findAccountByEmailFactory() {
    const repositoryFactory = new DbRepositoryFactory()
    return new FindAccountByEmailUsecase(repositoryFactory)
}
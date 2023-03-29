import { FindAccountUsecase } from "../../../application/use-cases.ts"
import { DbRepositoryFactory } from "../repositories"

export function findAccountFactory() {
    const repositoryFactory = new DbRepositoryFactory()
    return new FindAccountUsecase(repositoryFactory)
}
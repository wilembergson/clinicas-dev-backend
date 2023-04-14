import { FindConsultUsecase } from "@application/use-cases"
import { DbRepositoryFactory } from "@infra/factories/repositories"

export function findConsultFactory() {
    const repositoryFactory = new DbRepositoryFactory()
    return new FindConsultUsecase(repositoryFactory)
}
import { FindConsultByIdUsecase } from "@application/use-cases"
import { DbRepositoryFactory } from "@infra/factories/repositories"

export function findConsultByIdFactory() {
    const repositoryFactory = new DbRepositoryFactory()
    return new FindConsultByIdUsecase(repositoryFactory)
}
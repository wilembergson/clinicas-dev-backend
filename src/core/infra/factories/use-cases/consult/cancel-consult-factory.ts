import { CancelConsultUsecase } from "@application/use-cases"
import { DbRepositoryFactory } from "@infra/factories/repositories"

export function cancelConsultFactory() {
    const repositoryFactory = new DbRepositoryFactory()
    return new CancelConsultUsecase(repositoryFactory)
}
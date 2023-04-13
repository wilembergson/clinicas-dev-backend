import { AddConsultUsecase } from "@application/use-cases"
import { DbRepositoryFactory } from "@infra/factories/repositories"

export function addConsultFactory() {
    const repositoryFactory = new DbRepositoryFactory()
    return new AddConsultUsecase(repositoryFactory)
}
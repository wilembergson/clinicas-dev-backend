import { ListConsultsUsecase, NextConsultUsecase } from "@application/use-cases"
import { DbRepositoryFactory } from "@infra/factories/repositories"

export function nextConsultFactory() {
    const repositoryFactory = new DbRepositoryFactory()
    return new NextConsultUsecase(repositoryFactory)
}
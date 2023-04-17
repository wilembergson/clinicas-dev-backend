import { ListConsultsUsecase } from "@application/use-cases"
import { DbRepositoryFactory } from "@infra/factories/repositories"

export function listConsultsFactory() {
    const repositoryFactory = new DbRepositoryFactory()
    return new ListConsultsUsecase(repositoryFactory)
}
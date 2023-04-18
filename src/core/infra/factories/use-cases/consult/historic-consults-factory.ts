import { HistoricConsultsUsecase } from "@application/use-cases"
import { DbRepositoryFactory } from "@infra/factories/repositories"

export function historicConsultsFactory() {
    const repositoryFactory = new DbRepositoryFactory()
    return new HistoricConsultsUsecase(repositoryFactory)
}
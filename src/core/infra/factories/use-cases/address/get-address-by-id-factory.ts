import { GetAddressByIdUsecase } from "@application/use-cases"
import { DbRepositoryFactory } from "@infra/factories/repositories"

export function getAddressByIdFactory() {
    const repositoryFactory = new DbRepositoryFactory()
    return new GetAddressByIdUsecase(repositoryFactory)
}
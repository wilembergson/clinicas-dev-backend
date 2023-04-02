import { AddAddressUsecase } from "@application/use-cases"
import { DbRepositoryFactory } from "@infra/factories/repositories"

export function addAddressFactory() {
    const repositoryFactory = new DbRepositoryFactory()
    return new AddAddressUsecase(repositoryFactory)
}
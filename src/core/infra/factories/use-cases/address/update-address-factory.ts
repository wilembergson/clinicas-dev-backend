import { UpdateAddressUsecase } from "@application/use-cases/address/update-address"
import { DbRepositoryFactory } from "@infra/factories/repositories"

export function updateAddressFactory() {
    const repositoryFactory = new DbRepositoryFactory()
    return new UpdateAddressUsecase(repositoryFactory)
}
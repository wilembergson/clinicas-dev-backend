import { RepositoryFactory } from "@domain/factories";
import { AddressRepository } from "@domain/repositories";
import { AddAddress, GetAddressById } from "@domain/use-cases/address";

export class GetAddressByIdUsecase implements GetAddressById {
    private readonly addressRepository: AddressRepository

    constructor(
        repositoryFactory: RepositoryFactory
    ) {
        this.addressRepository = repositoryFactory.addressRepository()
    }
    async execute(id: string): Promise<AddAddress.Output> {
        const address = await this.addressRepository.getById(id)
        return address
    }
}
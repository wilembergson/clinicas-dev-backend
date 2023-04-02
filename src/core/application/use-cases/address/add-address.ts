import { Address } from "@domain/entities";
import { RepositoryFactory } from "@domain/factories";
import { AddressRepository } from "@domain/repositories";
import { AddAddress } from "@domain/use-cases/address";

export class AddAddressUsecase implements AddAddress {
    private readonly addressRepository: AddressRepository

    constructor(
        repositoryFactory: RepositoryFactory
    ) {
        this.addressRepository = repositoryFactory.addressRepository()
    }

    async execute(input: AddAddress.Input): Promise<AddAddress.Output> {
        const address = new Address(input)
        return await this.addressRepository.add(address)
    }

}
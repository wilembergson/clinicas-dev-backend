import { Address } from "@domain/entities";
import { RepositoryFactory } from "@domain/factories";
import { AddressRepository } from "@domain/repositories";
import { UpdateAddress } from "@domain/use-cases/address";

export class UpdateAddressUsecase implements UpdateAddress {
    private readonly addressRepository: AddressRepository

    constructor(
        repositoryFactory: RepositoryFactory
    ) {
        this.addressRepository = repositoryFactory.addressRepository()
    }
    async execute(input: UpdateAddress.Input): Promise<UpdateAddress.Output> {
        const foundAddress = await this.addressRepository.getById(input.id)
        const address = new Address(foundAddress)
        address.update(input)
        return await this.addressRepository.save(address)
        
    }
}
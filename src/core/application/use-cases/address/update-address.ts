import { Account, Address } from "@domain/entities";
import { RepositoryFactory } from "@domain/factories";
import { AccountRepository, AddressRepository } from "@domain/repositories";
import { AddAddress, UpdateAddress } from "@domain/use-cases/address";

export class UpdateAddressUsecase implements UpdateAddress {
    private readonly addressRepository: AddressRepository
    //private readonly accountRepository: AccountRepository

    constructor(
        repositoryFactory: RepositoryFactory
    ) {
        this.addressRepository = repositoryFactory.addressRepository()
        //this.accountRepository = repositoryFactory.accountRepository()
    }
    async execute(input: AddAddress.Input): Promise<UpdateAddress.Output> {
        const address = new Address(input)
        return await this.addressRepository.update(address)
        
    }

   

}
import { Account, Address } from "@domain/entities";
import { RepositoryFactory } from "@domain/factories";
import { AccountRepository, AddressRepository } from "@domain/repositories";
import { AddAddress } from "@domain/use-cases/address";

export class AddAddressUsecase implements AddAddress {
    private readonly addressRepository: AddressRepository
    private readonly accountRepository: AccountRepository

    constructor(
        repositoryFactory: RepositoryFactory
    ) {
        this.addressRepository = repositoryFactory.addressRepository(),
        this.accountRepository = repositoryFactory.accountRepository()
    }
    async execute(input: AddAddress.Input, sessionAccount: Account): Promise<AddAddress.Output> {
        const newAddress = new Address(input)
        const address = await this.addressRepository.add(newAddress)
        sessionAccount.updateAddress(newAddress)
        await this.accountRepository.update(sessionAccount)
        return address
    }

   

}
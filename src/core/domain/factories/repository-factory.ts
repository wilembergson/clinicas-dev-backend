import { AccountRepository, AddressRepository } from "@domain/repositories";

export interface RepositoryFactory{
    accountRepository(): AccountRepository
    addressRepository(): AddressRepository
}
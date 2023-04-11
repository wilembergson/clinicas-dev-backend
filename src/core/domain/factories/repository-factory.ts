import {
    AccountRepository,
    AddressRepository,
    SpecialtyRepository
} from "@domain/repositories";

export interface RepositoryFactory {
    accountRepository(): AccountRepository
    addressRepository(): AddressRepository
    specialtyRepository(): SpecialtyRepository
}
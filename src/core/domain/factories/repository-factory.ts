import {
    AccountRepository,
    AddressRepository,
    ConsultRepository,
    SpecialtyRepository
} from "@domain/repositories";

export interface RepositoryFactory {
    accountRepository(): AccountRepository
    addressRepository(): AddressRepository
    specialtyRepository(): SpecialtyRepository
    consultRepository(): ConsultRepository
}
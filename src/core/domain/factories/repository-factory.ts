import { AccountRepository } from "@domain/repositories";

export interface RepositoryFactory{
    accountRepository(): AccountRepository
}
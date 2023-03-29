import { AccountRepository } from "../repositories";

export interface RepositoryFactory{
    accountRepository(): AccountRepository
}
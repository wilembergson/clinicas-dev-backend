import { RepositoryFactory } from "@domain/factories"
import { AccountRepository, AddressRepository } from "@domain/repositories"
import { ConnectionDatabase } from "@infra/database/connection-database"
import { AccountRepositoryDb } from "@infra/respositories/account-respository-db"
import { AddressRepositoryDb } from "@infra/respositories/address-repository-db"

export class DbRepositoryFactory implements RepositoryFactory{
    private connection: ConnectionDatabase

    constructor(){
        this.connection = new ConnectionDatabase()
    }
    addressRepository(): AddressRepository {
        return new AddressRepositoryDb(this.connection)
    }

    accountRepository(): AccountRepository {
        return new AccountRepositoryDb(this.connection)
    }
    
}
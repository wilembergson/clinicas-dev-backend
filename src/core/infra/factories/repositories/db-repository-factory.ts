import { RepositoryFactory } from "@domain/factories"
import { AccountRepository } from "@domain/repositories"
import { ConnectionDatabase } from "@infra/database/connection-database"
import { AccountRepositoryDb } from "@infra/respositories/account-respository-db"

export class DbRepositoryFactory implements RepositoryFactory{
    private connection: ConnectionDatabase

    constructor(){
        this.connection = new ConnectionDatabase()
    }

    accountRepository(): AccountRepository {
        return new AccountRepositoryDb(this.connection)
    }
    
}
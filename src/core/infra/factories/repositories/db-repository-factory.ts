import { RepositoryFactory } from "@domain/factories"
import { ConnectionDatabase } from "@infra/database/connection-database"
import { AccountRepositoryDb } from "@infra/respositories/account-respository-db"
import { AddressRepositoryDb } from "@infra/respositories/address-repository-db"
import { SpecialtyRepositoryDb } from "@infra/respositories/specialty-respository-db"
import { AccountRepository, AddressRepository, ConsultRepository, SpecialtyRepository } from "@domain/repositories"
import { ConsultRepositoryDb } from "@infra/respositories/consult-respository"

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
    
    specialtyRepository(): SpecialtyRepository {
        return new SpecialtyRepositoryDb(this.connection)
    }

    consultRepository(): ConsultRepository {
        return new ConsultRepositoryDb(this.connection)
    }
}
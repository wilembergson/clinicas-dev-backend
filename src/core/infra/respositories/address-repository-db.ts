import { Address } from "@domain/entities";
import { AddressRepository } from "@domain/repositories";
import { ConnectionDatabase } from "@infra/database/connection-database";

export class AddressRepositoryDb implements AddressRepository {
    constructor(
        private readonly database: ConnectionDatabase
    ) { }
    
    async add(data: Address): Promise<Address.State> {
        return await this.database.getConnection().address.create({
            data: data.getState()
        })
    }
    
    async update(data: Address): Promise<Address.State> {
        return await this.database.getConnection().address.update({
            where:{
                id: data.getState().id
            },
            data: data.getState()
        })
    }
}
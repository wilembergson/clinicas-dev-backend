import { Address } from "@domain/entities";
import { AddressRepository } from "@domain/repositories";
import { ConnectionDatabase } from "@infra/database/connection-database";

export class AddressRepositoryDb implements AddressRepository {
    constructor(
        private readonly database: ConnectionDatabase
    ) { }
    
    async save(data: Address): Promise<Address.State> {
        const { id, number, street, district, city, uf } = data.getState()
        return await this.database.getConnection().address.upsert({
            where: { id },
            create: data.getState(),
            update: { number, street, district, city, uf }
        })
    }

    async getById(id: string): Promise<Address.State> {
        return await this.database.getConnection().address.findFirst({
            where: {
                id
            }
        })
    }
}
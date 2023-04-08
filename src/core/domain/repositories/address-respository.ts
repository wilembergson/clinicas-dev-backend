import { Address } from "@domain/entities"

export interface AddressRepository {
    save(data: Address): Promise<Address.State>
    getById(id: string): Promise<Address.State>
}
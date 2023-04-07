import { Address } from "@domain/entities"

export interface AddressRepository{
    add(data: Address): Promise<Address.State>
    update(data: Address): Promise<Address.State>
}
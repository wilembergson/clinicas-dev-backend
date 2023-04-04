import { Address } from "./address"
import { ID } from "./id"


export class Account {
    private id: ID
    private cpf: string
    private name: string
    private birthdate: string
    private phone: string
    private email: string
    private password: string
    private addressId: string
    private address: Address

    constructor({ id, ...rest }: Account.Constructor) {
        Object.assign(this, rest, { id: new ID(id) })
    }

    updateAddress(address: Address) {
        this.address = address
        this.addressId = address.getState().id
    }

    getAddress(): Address {
        return this.address
    }

    getState(): Account.State {
        return {
            id: this.id.value,
            cpf: this.cpf,
            name: this.name,
            birthdate: this.birthdate,
            phone: this.phone,
            email: this.email,
            password: this.password,
            addressId: this.addressId
        }
    }

    getInformations(): Account.StateWithoutID {
        return {
            cpf: this.cpf,
            name: this.name,
            birthdate: this.birthdate,
            phone: this.phone,
            email: this.email
        }
    }
    getInformationsWithPassword(): Account.InformationsWithPassword {
        return {
            cpf: this.cpf,
            name: this.name,
            birthdate: this.birthdate,
            phone: this.phone,
            email: this.email,
            password: this.password
        }
    }
}

export namespace Account {
    export type Constructor = {
        id?: string
        cpf: string
        name: string
        birthdate: string
        phone: string
        email: string
        password: string
        addressId?: string | null
    }
    export type State = {
        id: string
        cpf: string
        name: string
        birthdate: string
        phone: string
        email: string
        password: string
        addressId?: string | null
    }
    export type InformationsWithPassword = {
        cpf: string
        name: string
        birthdate: string
        phone: string
        email: string
        password: string
        addressId?: string | null
    }
    export type StateWithoutID = {
        cpf: string
        name: string
        birthdate: string
        phone: string
        email: string
        addressId?: string | null
    }
}

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

    constructor({ id, addressId, ...rest }: Account.Constructor) {
        Object.assign(this, rest, { id: new ID(id) }, this.addressId = null)
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
            email: this.email,
            addressId: this.addressId
        }
    }
    getInformationsWithPassword(): Account.InformationsWithPassword {
        return {
            cpf: this.cpf,
            name: this.name,
            birthdate: this.birthdate,
            phone: this.phone,
            email: this.email,
            password: this.password,
            addressId: this.addressId
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
        addressId?: string
    }
    export type State = {
        id: string
        cpf: string
        name: string
        birthdate: string
        phone: string
        email: string
        password: string
        addressId?: string
    }
    export type InformationsWithPassword = {
        cpf: string
        name: string
        birthdate: string
        phone: string
        email: string
        password: string
        addressId?: string
    }
    export type StateWithoutID = {
        cpf: string
        name: string
        birthdate: string
        phone: string
        email: string
        addressId?: string
    }
}

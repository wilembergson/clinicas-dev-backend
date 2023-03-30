import { ID } from "./id"

export class Account {
    private id: ID
    private cpf: string
    private name: string
    private birthdate: string
    private phone: string
    private email: string
    private password: string

    constructor({ id, ...rest }: Account.Constructor) {
        Object.assign(this, rest, { id: new ID(id) })
    }

    getState(): Account.State {
        return {
            id: this.id.value,
            cpf: this.cpf,
            name: this.name,
            birthdate: this.birthdate,
            phone: this.phone,
            email: this.email,
            password: this.password
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
    }
    export type State = {
        id: string
        cpf: string
        name: string
        birthdate: string
        phone: string
        email: string
        password: string
    }
    export type StateWithoutID = {
        cpf: string
        name: string
        birthdate: string
        phone: string
        email: string
    }
}
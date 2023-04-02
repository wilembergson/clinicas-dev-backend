import { ID } from "./id"

export class Address {
    private id: ID
    private number: string
    private street: string
    private district: string
    private city: string
    private uf: string
  

    constructor({ id, ...rest }: Address.Constructor) {
        Object.assign(this, rest, { id: new ID(id) })
    }

    getState(): Address.State {
        return {
            id: this.id.value,
            street: this.street,
            number: parseInt(this.number),
            district: this.district,
            city: this.city,
            uf: this.uf
        }
    }

    getStateString(): Address.StateString {
        return {
            id: this.id.value,
            street: this.street,
            number: this.number,
            district: this.district,
            city: this.city,
            uf: this.uf
        }
    }
}

export namespace Address {
    export type Constructor = {
        id?: string
        number: string
        street: string
        district: string
        city: string
        uf: string
    }
    export type State = {
        id: string
        number: number
        street: string
        district: string
        city: string
        uf: string
    }
    export type StateString = {
        id: string
        number: string
        street: string
        district: string
        city: string
        uf: string
    }
}

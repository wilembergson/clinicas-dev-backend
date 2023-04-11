import { ID } from "./id";

export class Day {
    private id: ID
    private name: string

    constructor({ id, ...rest }: Day.Constructor) {
        Object.assign(this, rest, { id: new ID(id) })
    }

    getState(): Day.State {
        return {
            id: this.id.value,
            name: this.name
        }
    }
}

export namespace Day {
    export type Constructor = {
        id?: string
        name: string
    }
    export type State = {
        id: string
        name: string
    }
}
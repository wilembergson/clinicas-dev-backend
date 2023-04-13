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

    getDayNumber(): number {
        switch (this.name) {
            case 'DOMINGO':
                return 0
                break
            case 'SEGUNDA':
                return 1
                break
            case 'TERÇA':
                return 2
                break
            case 'QUARTA':
                return 3
                break
            case 'QUINTA':
                return 4
                break
            case 'SEXTA':
                return 5
                break
            case 'SÁBADO':
                return 6
                break
            default:
                break
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
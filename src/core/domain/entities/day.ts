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
            case 'SEGUNDA':
                return 1
            case 'TERÇA':
                return 2
            case 'QUARTA':
                return 3
            case 'QUINTA':
                return 4
            case 'SEXTA':
                return 5
            case 'SÁBADO':
                return 6
            default:
                return null
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
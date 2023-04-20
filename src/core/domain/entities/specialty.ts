import { Day } from "./day";
import { ID } from "./id";

export class Specialty {
    private id: ID
    private name: string
    private days: Day[]

    constructor({ id, ...rest }: Specialty.Constructor) {
        Object.assign(this, rest, { id: new ID(id) })
    }

    addDays(days: Day[]){
        this.days = days
    }

    getState(): Specialty.State{
        return {
            id: this.id.value,
            name: this.name,
            days: this.days
        }
    }

    getAvailableDays(): number[]{
        return this.days.map(item => item.getDayNumber())
    }

    getAvailableNameDays(): string[]{
        return this.days.map(item => item.getState().name)
    }
}

export namespace Specialty {
    export type Constructor = {
        id?: string
        name: string
    }
    export type State = {
        id: string
        name: string
        days: Day[]
    }
}
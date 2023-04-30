import { ID } from "./id";
import { Account } from "./account";
import { Specialty } from "./specialty";

export class Consult {
    private id: ID
    private date: string
    private active: boolean
    private specialty: Specialty
    private account: Account

    constructor({ id, ...rest }: Consult.Constructor) {
        Object.assign(this, rest, { id: new ID(id) }, this.active = true)
    }

    getState(): Consult.State {
        return {
            id: this.id.value,
            date: this.date,
            active: this.active,
            specialty: this.specialty,
            account: this.account
        }
    }

    addSpecialty(specialty: Specialty) {
        this.specialty = specialty
    }

    addAccount(account: Account) {
        this.account = account
    }

    setActive(active: boolean){
        this.active = active
    }
}

export namespace Consult {
    export type Constructor = {
        id?: string
        date: string
    }
    export type State = {
        id: string
        date: string
        active: boolean
        specialty: Specialty
        account: Account
    }
}
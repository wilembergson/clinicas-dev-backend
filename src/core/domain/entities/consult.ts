import { ID } from "./id";
import { Account } from "./account";
import { Specialty } from "./specialty";

export class Consult {
    private id: ID
    private date: string
    private specialty: Specialty
    private account: Account

    constructor({ id, ...rest }: Consult.Constructor) {
        Object.assign(this, rest, { id: new ID(id) })
    }

    getState(): Consult.State {
        return {
            id: this.id.value,
            date: this.date,
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
}

export namespace Consult {
    export type Constructor = {
        id?: string
        name: string
    }
    export type State = {
        id: string
        date: string
        specialty: Specialty
        account: Account
    }
}
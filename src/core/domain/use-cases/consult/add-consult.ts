import { Account, Consult } from "@domain/entities"

export interface AddConsult {
    execute(input:AddConsult.Input, sessionAccount: Account):Promise<Consult>
}

export namespace AddConsult {
    export type Input = {
        specialty: string
        date: string
    }
}
import { Account, Consult } from "@domain/entities"

export interface NextConsult {
    execute(account: Account): Promise<Consult>
}
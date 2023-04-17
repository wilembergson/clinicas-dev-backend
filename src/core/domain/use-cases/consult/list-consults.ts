import { Account, Consult } from "@domain/entities"

export interface ListConsults {
    execute(account: Account): Promise<Consult[]>
}
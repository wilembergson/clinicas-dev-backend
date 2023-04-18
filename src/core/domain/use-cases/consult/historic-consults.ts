import { Account, Consult } from "@domain/entities"

export interface HistoricConsults {
    execute(account: Account): Promise<Consult[]>
}
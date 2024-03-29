import { Consult } from "@domain/entities"

export interface CancelConsult {
    execute(id: string, accountId: string): Promise<Consult>
}

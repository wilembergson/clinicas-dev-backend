import { Consult } from "@domain/entities"

export interface CancelConsult {
    execute(id: string): Promise<Consult>
}

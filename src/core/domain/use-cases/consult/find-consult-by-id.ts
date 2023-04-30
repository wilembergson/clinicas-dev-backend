import { Consult } from "@domain/entities"

export interface FindConsultById {
    execute(id: string): Promise<Consult>
}
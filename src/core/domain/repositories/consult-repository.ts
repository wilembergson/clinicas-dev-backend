import { Consult } from "@domain/entities";

export interface ConsultRepository {
    save(consult: Consult): Promise<void>
}
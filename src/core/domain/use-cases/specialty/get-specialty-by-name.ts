import { Specialty } from "@domain/entities";

export interface FindSpecialtyByName {
    execute(name: string): Promise<Specialty>
}

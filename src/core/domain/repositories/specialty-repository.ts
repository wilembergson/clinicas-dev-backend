import { Specialty } from "@domain/entities";

export interface SpecialtyRepository{
    getByName(name: string): Promise<Specialty>
}
import { Consult } from "@domain/entities"

export interface FindConsult {
    execute(input: FindConsult.Input): Promise<Consult>
}

export namespace FindConsult {
    export type Input = {
        specialty: string;
        date: string;
        accountId: string;
    }
}
import { Consult } from "@domain/entities";

export interface ConsultRepository {
    save(consult: Consult): Promise<Consult>
    getConsult(input: ConsultRepository.Input): Promise<Consult>
    listConsults(accountId: string): Promise<Consult[]>
    getConsultById(id: string, accountId: string): Promise<Consult>
    update(consult: Consult): Promise<Consult>
}

export namespace ConsultRepository {
    export type Input = {
        specialty: string,
        date: string,
        accountId:string
    }
}
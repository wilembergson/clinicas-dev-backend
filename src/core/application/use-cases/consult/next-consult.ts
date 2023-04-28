import { Account, Consult } from "@domain/entities";
import { RepositoryFactory } from "@domain/factories";
import { NextConsult } from "@domain/use-cases/consult";
import { ConsultRepository } from "@domain/repositories";

export class NextConsultUsecase implements NextConsult {
    private readonly consultRepository: ConsultRepository

    constructor(
        repositoryFactory: RepositoryFactory
    ) {
        this.consultRepository = repositoryFactory.consultRepository()
    }

    async execute(account: Account): Promise<Consult> {
        const list = await this.consultRepository.listConsults(account.getState().id)
        list.sort((a, b) => Number(new Date(a.getState().date)) - Number(new Date(b.getState().date)))
        const today = new Date()
        const orderedList = list.filter(item => new Date(item.getState().date) > today)
        return orderedList[0]
    }

}
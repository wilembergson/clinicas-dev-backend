import { Account, Consult } from "@domain/entities";
import { RepositoryFactory } from "@domain/factories";
import { ConsultRepository } from "@domain/repositories";
import { HistoricConsults } from "@domain/use-cases/consult";

export class HistoricConsultsUsecase implements HistoricConsults {
    private readonly consultRepository: ConsultRepository

    constructor(
        repositoryFactory: RepositoryFactory
    ) {
        this.consultRepository = repositoryFactory.consultRepository()
    }

    async execute(account: Account): Promise<Consult[]> {
        const list = await this.consultRepository.listConsults(account.getState().id)
        list.sort((a, b) => Number(new Date(b.getState().date)) - Number(new Date(a.getState().date)))
        const today = new Date()
        today.setHours(-3, 0, 0, 0)
        const orderedList = list.filter(item => new Date(item.getState().date) < today)
        return orderedList
    }

}
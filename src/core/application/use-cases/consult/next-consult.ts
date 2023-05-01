import { Account, Consult } from "@domain/entities";
import { RepositoryFactory } from "@domain/factories";
import { NextConsult } from "@domain/use-cases/consult";
import { ConsultRepository } from "@domain/repositories";
import moment from 'moment-timezone'

export class NextConsultUsecase implements NextConsult {
    private readonly consultRepository: ConsultRepository

    constructor(
        repositoryFactory: RepositoryFactory
    ) {
        this.consultRepository = repositoryFactory.consultRepository()
    }

    async execute(account: Account): Promise<Consult> {
        const result = await this.consultRepository.listConsults(account.getState().id)
        const list = result.filter(item => item.getState().active === true)
        list.sort((a, b) => Number(new Date(a.getState().date)) - Number(new Date(b.getState().date)))
        const now = moment().tz('America/Sao_Paulo')
        const today = now.toDate()
        today.setHours(-3, 0, 0, 0)
        const orderedList = list.filter(item => new Date(item.getState().date) >= today) 
        return orderedList[0]
    }

}
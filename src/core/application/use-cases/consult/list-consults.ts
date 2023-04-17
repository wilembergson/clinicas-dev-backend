import { Account, Consult } from "@domain/entities";
import { RepositoryFactory } from "@domain/factories";
import { ListConsults } from "@domain/use-cases/consult";
import { ConsultRepository } from "@domain/repositories";

export class ListConsultsUsecase implements ListConsults {
    private readonly consultRepository: ConsultRepository

    constructor(
        repositoryFactory: RepositoryFactory
    ) {
        this.consultRepository = repositoryFactory.consultRepository()
    }

    async execute(account: Account): Promise<Consult[]> {
        const result = await this.consultRepository.listConsults(account.getState().id)
        return (result ? result : [])
    }

}
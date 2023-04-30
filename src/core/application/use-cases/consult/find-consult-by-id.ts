import { Consult } from "@domain/entities";
import { RepositoryFactory } from "@domain/factories";
import { ConsultRepository } from "@domain/repositories";
import { FindConsultById } from "@domain/use-cases/consult";

export class FindConsultByIdUsecase implements FindConsultById {
    private readonly consultRepository: ConsultRepository

    constructor(
        repositoryFactory: RepositoryFactory
    ) {
        this.consultRepository = repositoryFactory.consultRepository()
    }
    
    async execute(id: string): Promise<Consult> {
        return await this.consultRepository.getConsultById(id)
    }
}
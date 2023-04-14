import { Consult } from "@domain/entities";
import { RepositoryFactory } from "@domain/factories";
import { FindConsult } from "@domain/use-cases/consult";
import { ConsultRepository } from "@domain/repositories";

export class FindConsultUsecase implements FindConsult {
    private readonly consultRepository: ConsultRepository

    constructor(
        repositoryFactory: RepositoryFactory
    ) {
        this.consultRepository = repositoryFactory.consultRepository()
    }
    
    async execute(input: FindConsult.Input): Promise<Consult> {
        const result = await this.consultRepository.getConsult(input)
        return result
    }
    
}
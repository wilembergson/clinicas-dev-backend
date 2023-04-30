import { Consult } from "@domain/entities";
import { RepositoryFactory } from "@domain/factories";
import { ConsultRepository } from "@domain/repositories";
import { CancelConsult } from "@domain/use-cases/consult";

export class CancelConsultUsecase implements CancelConsult {
    private readonly consultRepositoty: ConsultRepository

    constructor(respositoryFactory: RepositoryFactory) {
        this.consultRepositoty = respositoryFactory.consultRepository()
    }

    async execute(id: string): Promise<Consult> {
        const consult = await this.consultRepositoty.getConsultById(id)
        consult.setActive(false)
        return await this.consultRepositoty.update(consult)
    }

}
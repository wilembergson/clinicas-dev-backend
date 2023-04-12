import { Account, Consult } from "@domain/entities";
import { RepositoryFactory } from "@domain/factories";
import { ConsultRepository, SpecialtyRepository } from "@domain/repositories";
import { AddConsult } from "@domain/use-cases/consult/add-consult";

export class AddConsultUsecase implements AddConsult{
    private readonly consultRepositoty: ConsultRepository
    private readonly specialtyRepositoty: SpecialtyRepository

    constructor(respositoryFactory: RepositoryFactory){
        this.consultRepositoty = respositoryFactory.consultRepository(),
        this.specialtyRepositoty = respositoryFactory.specialtyRepository()
    }
    async execute(input: AddConsult.Input, sessionAccount: Account): Promise<Consult> {
        const specialty = await this.specialtyRepositoty.getByName(input.specialty)
        const consult = new Consult({date: input.date}) 
        consult.addSpecialty(specialty)
        consult.addAccount(sessionAccount)
        return await this.consultRepositoty.save(consult)
    }
    
}
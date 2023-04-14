import { AlreadMarkedConsultException, BaseException, NotBelongSpecialtyDayException } from "@application/exceptions"
import { FindConsultUsecase } from "@application/use-cases"
import { HttpRequest, Validation } from "@infra/protocols"

export class ExistingConsultValidation implements Validation {
    constructor(
        private readonly findSpecialty: FindConsultUsecase
    ) { }

    async validate(input: HttpRequest): Promise<BaseException> {
        const { specialty, date } = input.body
        const { id } = input.sessionAccount.getState()
        const consult = await this.findSpecialty.execute({
            date,
            specialty,
            accountId: id
        })
        if (consult) return new AlreadMarkedConsultException()
    }

}
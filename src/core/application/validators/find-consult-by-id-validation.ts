import { AlreadMarkedConsultException, BaseException, NotFoundConsultException } from "@application/exceptions"
import { FindConsultById } from "@domain/use-cases/consult"
import { HttpRequest, Validation } from "@infra/protocols"

export class FindConsultByIDValidation implements Validation {
    constructor(
        private readonly findConsult: FindConsultById
    ) { }

    async validate(input: HttpRequest): Promise<BaseException> {
        const { id } = input.params
        const accountId = input.sessionAccount.getState().id
        const consult = await this.findConsult.execute(id, accountId)
        console.log(consult)
        if (!consult) return new NotFoundConsultException()
    }

}
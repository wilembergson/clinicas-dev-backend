import { HttpRequest, Validation } from "@infra/protocols"
import { FindConsultById } from "@domain/use-cases/consult"
import { BaseException, NotBelongConsultException } from "@application/exceptions"
import { Account, Consult } from "@domain/entities"

export class NotBelongConsultValidation implements Validation {
    constructor(
        private readonly findConsult: FindConsultById
    ) { }

    async validate(input: HttpRequest): Promise<BaseException> {
        const consultId = input.params.id
        const accountId = input.sessionAccount.getState().id
        console.log(accountId)
        const consult = await this.findConsult.execute(consultId)
        console.log(consult.getState().account)
        const newAccount = new Account(consult.getState().account.getState())
        console.log('sdfadgadgafsdgasgzgsgzdgsdf')
        //if (consult.getState().account.getState().id !== accountId) 
        return new NotBelongConsultException()
    }

}
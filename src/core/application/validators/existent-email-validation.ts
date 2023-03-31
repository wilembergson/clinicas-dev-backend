import { BaseException, ExistsEmailException } from "@application/exceptions"
import { FindAccountByEmail } from "@domain/use-cases/find-account-by-email"
import { HttpRequest, Validation } from "@infra/protocols"


export class ExistentEmailValidation implements Validation {
    constructor(
        private readonly findAccount: FindAccountByEmail
    ) { }

    async validate(input: HttpRequest): Promise<BaseException> {
        const paramEmail = input.body.email
        const email = await this.findAccount.execute(paramEmail)
        if (email) return new ExistsEmailException()
    }

}
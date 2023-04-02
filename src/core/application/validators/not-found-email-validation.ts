import { BaseException, NotFoundEmailException } from "@application/exceptions"
import { FindAccountByEmail } from "@domain/use-cases/account"
import { HttpRequest, Validation } from "@infra/protocols"


export class NotFoundEmailValidation implements Validation {
    constructor(
        private readonly findAccount: FindAccountByEmail
    ) { }

    async validate(input: HttpRequest): Promise<BaseException> {
        const paramEmail = input.body.email
        const account = await this.findAccount.execute(paramEmail)
        if (!account) return new NotFoundEmailException()
    }

}
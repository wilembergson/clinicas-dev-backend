import { BaseException, InvalidEmailException } from "@application/exceptions"
import { EmailValidator, HttpRequest, Validation } from "@infra/protocols"

export class EmailFormatValidation implements Validation {
    constructor(
        private readonly emailValidator: EmailValidator
    ) { }

    async validate(input: HttpRequest): Promise<BaseException> {
        const email = input.body.email
        const isValid = this.emailValidator.isValid(email)
        if(!isValid) return new InvalidEmailException()
    }

}
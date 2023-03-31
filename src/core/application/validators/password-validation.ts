import { BaseException, InvalidPasswordException } from "@application/exceptions"
import { HashComparer } from "@application/protocols/cryptografy"
import { HttpRequest, Validation } from "@infra/protocols"
import { AccountRepository } from "@domain/repositories"
import { RepositoryFactory } from "@domain/factories"

export class PasswordValidation implements Validation {
    private readonly accountRepository: AccountRepository
    constructor(
        private readonly hashComparer: HashComparer,
        respoitoryFactory: RepositoryFactory
    ) {
        this.accountRepository = respoitoryFactory.accountRepository()
    }

    async validate(input: HttpRequest): Promise<BaseException> {
        const account = await this.accountRepository.findByEmail(input.body.email)
        const isValid = await this.hashComparer.compare(input.body.password, account.password)
        if (!isValid) return new InvalidPasswordException()
    }

}
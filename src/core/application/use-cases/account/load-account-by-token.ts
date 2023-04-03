import { Decrypter } from "@application/protocols/cryptografy"
import { Account } from "@domain/entities"
import { RepositoryFactory } from "@domain/factories"
import { AccountRepository } from "@domain/repositories"
import { LoadAccountByToken } from "@domain/use-cases/account"

export class LoadAccountByTokenUsecase implements LoadAccountByToken {
    private readonly accountRepository: AccountRepository
    constructor(
        private readonly decrypter: Decrypter,
        repositoryFactory: RepositoryFactory
    ) {
        this.accountRepository = repositoryFactory.accountRepository()
    }

    async execute(accessToken: string): Promise<Account> {
        const payload = await this.decrypter.decrypt(accessToken)
        if (payload) {
            const account = await this.accountRepository.findByCpf(payload.cpf)
            if (account) {
                return new Account(account)
            }
        }
        return null
    }
}
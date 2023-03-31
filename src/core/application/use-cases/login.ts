import { Encrypter, HashComparer } from "@application/protocols/cryptografy";
import { AccountRepository } from "@domain/repositories";
import { RepositoryFactory } from "@domain/factories";
import { Login } from "@domain/use-cases/login";

export class LoginUsecase implements Login {
    private readonly accountRepository: AccountRepository

    constructor(
        private readonly hashComparer: HashComparer,
        private readonly encrypter: Encrypter,
        repositoryFactory: RepositoryFactory
    ) {
        this.accountRepository = repositoryFactory.accountRepository()
    }

    async execute(input: Login.Input): Promise<string> {
        const account = await this.accountRepository.findByEmail(input.email)
        if (!account) return null
        const isValid = await this.hashComparer.compare(input.password, account.password)
        if (isValid) {
            const token = await this.encrypter.encrypt({
                id: account.id,
                name: account.name
            })
            return token
        }
    }
}
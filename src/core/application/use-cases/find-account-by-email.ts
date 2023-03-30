import { Account } from "../../domain/entities";
import { RepositoryFactory } from "../../domain/factories";
import { AccountRepository } from "../../domain/repositories";
import { FindAccountByEmail } from "../../domain/use-cases/find-account-by-email";

export class FindAccountByEmailUsecase implements FindAccountByEmail {
    private readonly accountRepository: AccountRepository

    constructor(repositoryFactory: RepositoryFactory) {
        this.accountRepository = repositoryFactory.accountRepository()
    }

    async execute(input: string): Promise<FindAccountByEmail.Output> {
        const result = await this.accountRepository.findByEmail(input)
        if (!result) return null
        const account = new Account(result)
        return account.getInformations()
    }
}
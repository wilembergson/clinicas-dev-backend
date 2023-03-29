import { Account } from "../../domain/entities";
import { RepositoryFactory } from "../../domain/factories";
import { AccountRepository } from "../../domain/repositories";
import { FindAccount } from "../../domain/use-cases/find-account";

export class FindAccountUsecase implements FindAccount {
    private readonly accountRepository: AccountRepository

    constructor(repositoryFactory: RepositoryFactory) {
        this.accountRepository = repositoryFactory.accountRepository()
    }

    async execute(input: string): Promise<FindAccount.Output> {
        const result = await this.accountRepository.findByCpf(input)
        if (!result) return null
        const account = new Account(result)
        return account.getStateWithoutID()
    }
}
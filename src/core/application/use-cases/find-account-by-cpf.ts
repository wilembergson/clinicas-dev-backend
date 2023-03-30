import { Account } from "../../domain/entities";
import { RepositoryFactory } from "../../domain/factories";
import { AccountRepository } from "../../domain/repositories";
import { FindAccountByCpf } from "../../domain/use-cases/find-account-by-cpf";

export class FindAccountByCpfUsecase implements FindAccountByCpf {
    private readonly accountRepository: AccountRepository

    constructor(repositoryFactory: RepositoryFactory) {
        this.accountRepository = repositoryFactory.accountRepository()
    }

    async execute(input: string): Promise<FindAccountByCpf.Output> {
        const result = await this.accountRepository.findByCpf(input)
        if (!result) return null
        const account = new Account(result)
        return account.getInformations()
    }
}
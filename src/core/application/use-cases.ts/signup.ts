import { Account } from "../../domain/entities";
import { AccountRepository } from "../../domain/repositories";
import { Signup } from "../../domain/use-cases/signup";
import { Hasher } from "../protocols/cryptografy/hasher";

export class SignupUsecase implements Signup {
    constructor(
        private readonly hasher: Hasher,
        private readonly accountRepository: AccountRepository
    ) { }

    async execute(input: Signup.Input): Promise<Signup.Output> {
        const foundAccount = await this.accountRepository.findByCpf(input.cpf)
        if (!foundAccount) {
            const hashedPassword = await this.hasher.hash(input.password)
            const account = new Account(Object.assign({}, input, { password: hashedPassword }))
            return await this.accountRepository.add(account)
        }
        return null
    }
}
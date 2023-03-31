import { BaseException, ExistsCpfException } from "@application/exceptions"
import { FindAccountByCpf } from "@domain/use-cases/find-account-by-cpf"
import { HttpRequest, Validation } from "@infra/protocols"


export class ExistentCpfValidation implements Validation {
    constructor(
        private readonly findAccount: FindAccountByCpf
    ) { }

    async validate(input: HttpRequest): Promise<BaseException> {
        let paramCpf: string
        (input.body.cpf ? paramCpf = input.body.cpf : paramCpf = input.params.cpf)
        const account = await this.findAccount.execute(paramCpf)
        if (account) return new ExistsCpfException()
    }

}
import { FindAccountByCpf } from "../../domain/use-cases/find-account-by-cpf";
import { HttpRequest, Validation } from "../../infra/protocols";
import { BaseException, ExistsCpfException } from "../exceptions";

export class ExistentCpfValidation implements Validation {
    constructor(
        private readonly findAccount: FindAccountByCpf
    ) { }

    async validate(input: HttpRequest): Promise<BaseException> {
        let paramCpf: string
        (input.body.cpf ? paramCpf = input.body.cpf : paramCpf = input.params.cpf)
        const cpf = await this.findAccount.execute(paramCpf)
        if (cpf) return new ExistsCpfException()
    }

}
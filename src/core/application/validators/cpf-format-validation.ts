import { BaseException, InvalidCpfException } from "@application/exceptions"
import { CpfValidator, HttpRequest, Validation } from "@infra/protocols"

export class CpfFormatValidation implements Validation{
    constructor(
        private readonly cpfValidator: CpfValidator
    ){}

    async validate(input: HttpRequest): Promise<BaseException> {
        let cpf:string
        (input.body.cpf ? cpf = input.body.cpf : cpf = input.params.cpf)
        const formatedCPF = cpf.replace(/\.|\-/g, '')
        const isValid = this.cpfValidator.isValid(formatedCPF)
        if(!isValid) return new InvalidCpfException()
    }
    
}
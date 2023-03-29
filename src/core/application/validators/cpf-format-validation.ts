import { CpfValidator, HttpRequest, Validation } from "../../infra/protocols";
import { BaseException, InvalidCpfException } from "../exceptions";

export class CpfFormatValidation implements Validation{
    constructor(
        private readonly cpfValidator: CpfValidator
    ){}

    async validate(input: HttpRequest): Promise<BaseException> {
        let cpf:string
        (input.body.cpf ? cpf = input.body.cpf : cpf = input.params.cpf)
        const isValid = this.cpfValidator.isValid(cpf)
        if(!isValid) return new InvalidCpfException()
    }
    
}
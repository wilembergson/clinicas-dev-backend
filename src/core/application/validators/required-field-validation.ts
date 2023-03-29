import { HttpRequest, Validation } from "../../infra/protocols";
import { BaseException, MissingParamError } from "../exceptions";

export class RequiredFieldValidation implements Validation{
    constructor(
        private readonly fieldName: string
    ){}
    
    async validate(input: HttpRequest): Promise<BaseException> {
        if(!input.body[this.fieldName]) return new MissingParamError(this.fieldName)
    }
}
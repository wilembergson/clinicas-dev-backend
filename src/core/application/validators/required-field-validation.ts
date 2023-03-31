import { BaseException, MissingParamError } from "@application/exceptions";
import { HttpRequest, Validation } from "@infra/protocols";
import { ObjectSchema } from "joi";

export class RequiredFieldValidation implements Validation{
    constructor(
        private readonly schema: ObjectSchema
    ){}
    
    async validate(input: HttpRequest): Promise<BaseException> {
        const validate = this.schema.validate(input.body)
        if(validate.error) return new MissingParamError(validate.error.message)
    }
}
import { ObjectSchema } from "joi";
import { HttpRequest, Validation } from "../../infra/protocols";
import { BaseException, MissingParamError } from "../exceptions";

export class RequiredFieldValidation implements Validation{
    constructor(
        private readonly schema: ObjectSchema
    ){}
    
    async validate(input: HttpRequest): Promise<BaseException> {
        const validate = this.schema.validate(input.body)
        if(validate.error) return new MissingParamError(validate.error.message)
        //if(!input.body[this.fieldName]) return new MissingParamError(this.fieldName)
    }
}
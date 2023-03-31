import { BaseException } from "@application/exceptions"
import { HttpRequest, Validation } from "@infra/protocols"

export class ValidationComposite implements Validation{
    constructor(
        private readonly validations: Validation[]
    ) { }

    async validate(input: HttpRequest): Promise<BaseException> {
        for(const validation of this.validations){
            const error = await validation.validate(input)
            if(error) return error
        }
    }
}
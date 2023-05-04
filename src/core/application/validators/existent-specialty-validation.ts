import { BaseException, NotFoundSpecialtyException } from "@application/exceptions"
import { FindSpecialtyByName } from "@domain/use-cases/specialty"
import { HttpRequest, Validation } from "@infra/protocols"

export class ExistentSpecialtyValidation implements Validation {
    constructor(
        private readonly findSpecialty: FindSpecialtyByName
    ) { }

    async validate(input: HttpRequest): Promise<BaseException> {
        const specialtyName  = input.body.specialty
        const specialty = await this.findSpecialty.execute(specialtyName)
        if (!specialty) return new NotFoundSpecialtyException()
    }
}
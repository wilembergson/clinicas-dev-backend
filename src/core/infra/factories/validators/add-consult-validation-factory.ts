import { Validation } from "@infra/protocols";
import { consultSchema } from "@application/schemas";
import {
    RequiredFieldValidation,
    ValidationComposite
} from "@application/validators";

export function addConsultValidationFactory(): ValidationComposite {
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation(consultSchema))
    return new ValidationComposite(validations)
}
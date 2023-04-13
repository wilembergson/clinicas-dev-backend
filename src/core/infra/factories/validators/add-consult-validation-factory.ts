import { Validation } from "@infra/protocols";
import { consultSchema } from "@application/schemas";
import { findSpecialtyByNameFactory } from "../use-cases";
import { ExistentSpecialtyValidation } from "@application/validators/existent-specialty-validation";
import {
    RequiredFieldValidation,
    SpecialtyDaysValidation,
    ValidationComposite
} from "@application/validators";

export function addConsultValidationFactory(): ValidationComposite {
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation(consultSchema))
    validations.push(new ExistentSpecialtyValidation(findSpecialtyByNameFactory()))
    validations.push(new SpecialtyDaysValidation(findSpecialtyByNameFactory()))
    return new ValidationComposite(validations)
}
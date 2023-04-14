import { Validation } from "@infra/protocols";
import { consultSchema } from "@application/schemas";
import { findConsultFactory, findSpecialtyByNameFactory } from "../use-cases";
import { ExistentSpecialtyValidation } from "@application/validators/existent-specialty-validation";
import {
    RequiredFieldValidation,
    SpecialtyDaysValidation,
    ValidationComposite
} from "@application/validators";
import { ExistingConsultValidation } from "@application/validators/existing-consult-validation";

export function addConsultValidationFactory(): ValidationComposite {
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation(consultSchema))
    validations.push(new ExistentSpecialtyValidation(findSpecialtyByNameFactory()))
    validations.push(new SpecialtyDaysValidation(findSpecialtyByNameFactory()))
    validations.push(new ExistingConsultValidation(findConsultFactory()))
    return new ValidationComposite(validations)
}
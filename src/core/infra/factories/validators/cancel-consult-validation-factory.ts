import { Validation } from "@infra/protocols";
import { FindConsultByIDValidation, ValidationComposite } from "@application/validators";
import { findConsultByIdFactory } from "../use-cases/consult/find-consult-by-id-factory";

export function cancelConsultValidationFactory(): ValidationComposite {
    const validations: Validation[] = []
    validations.push(new FindConsultByIDValidation(findConsultByIdFactory()))

    return new ValidationComposite(validations)
}
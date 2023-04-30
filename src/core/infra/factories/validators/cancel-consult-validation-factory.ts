import { Validation } from "@infra/protocols";
import { FindConsultByIDValidation, NotBelongConsultValidation, ValidationComposite } from "@application/validators";
import { findConsultByIdFactory } from "../use-cases/consult/find-consult-by-id-factory";

export function cancelConsultValidationFactory(): ValidationComposite {
    const validations: Validation[] = []
    validations.push(new FindConsultByIDValidation(findConsultByIdFactory()))
    //validations.push(new NotBelongConsultValidation(findConsultByIdFactory()))

    return new ValidationComposite(validations)
}
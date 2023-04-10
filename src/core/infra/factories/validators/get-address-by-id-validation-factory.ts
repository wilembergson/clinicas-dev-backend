import { Validation } from "@infra/protocols";
import {
    NullAddressValidation,
    ValidationComposite
} from "@application/validators";

export function getAddressByIdValidationFactory(): ValidationComposite {
    const validations: Validation[] = []
    validations.push(new NullAddressValidation())
    return new ValidationComposite(validations)
}
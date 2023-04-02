import { Validation } from "@infra/protocols";
import { addressSchema } from "@application/schemas";
import {
    RequiredFieldValidation,
    ValidationComposite
} from "@application/validators";

export function addAddressValidationFactory(): ValidationComposite {
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation(addressSchema))
    return new ValidationComposite(validations)
}
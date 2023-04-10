import { Validation } from "@infra/protocols";
import { addressSchema } from "@application/schemas";
import {
    AddressRegistredValidation,
    RequiredFieldValidation,
    ValidationComposite
} from "@application/validators";

export function addAddressValidationFactory(): ValidationComposite {
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation(addressSchema))
    validations.push(new AddressRegistredValidation())
    return new ValidationComposite(validations)
}
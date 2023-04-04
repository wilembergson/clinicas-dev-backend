import { Validation } from "@infra/protocols";
import { addressSchema } from "@application/schemas";
import {
    RequiredFieldValidation,
    ValidationComposite
} from "@application/validators";
import { AddressRegistredValidation } from "@application/validators/address-registred-validation";

export function addAddressValidationFactory(): ValidationComposite {
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation(addressSchema))
    validations.push(new AddressRegistredValidation())
    return new ValidationComposite(validations)
}
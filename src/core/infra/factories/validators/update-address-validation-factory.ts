import { Validation } from "@infra/protocols";
import { updateAddressSchema } from "@application/schemas";
import { RequiredFieldValidation, ValidationComposite } from "@application/validators";
import { BelongAddressValidation } from "@application/validators/Belong-address-validation";

export function updateAddressValidationFactory(): ValidationComposite {
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation(updateAddressSchema))
    validations.push(new BelongAddressValidation())
    return new ValidationComposite(validations)
}
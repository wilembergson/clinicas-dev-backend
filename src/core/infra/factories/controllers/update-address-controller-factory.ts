import { Controller } from "@infra/protocols";
import { updateAddressFactory } from "../use-cases";
import { UpdateAddressController } from "@infra/controllers";
import { updateAddressValidationFactory } from "../validators/update-address-validation-factory";

export function updateAddressControllerFactory(): Controller {
    return new UpdateAddressController(updateAddressValidationFactory(), updateAddressFactory())
}
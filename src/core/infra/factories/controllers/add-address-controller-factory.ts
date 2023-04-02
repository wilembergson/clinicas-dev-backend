import { AddAddressController } from "@infra/controllers";
import { addAddressFactory } from "../use-cases";
import { Controller } from "@infra/protocols";
import { addAddressValidationFactory } from "../validators/add-address-validation-factory";

export function addAddressControllerFactory(): Controller {
    return new AddAddressController(addAddressValidationFactory(), addAddressFactory())
}
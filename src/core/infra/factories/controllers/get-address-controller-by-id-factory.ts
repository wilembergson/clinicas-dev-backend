import { Controller } from "@infra/protocols";
import { getAddressByIdFactory } from "../use-cases";
import { GetAddressByIdController } from "@infra/controllers";
import { getAddressByIdValidationFactory } from "../validators/get-address-by-id-validation-factory";

export function getAddressByIdControllerFactory(): Controller {
    return new GetAddressByIdController(getAddressByIdValidationFactory(), getAddressByIdFactory())
}
import { Controller } from "@infra/protocols";
import { cancelConsultFactory } from "../use-cases";
import { CancelConsultController } from "@infra/controllers";
import { cancelConsultValidationFactory } from "../validators/cancel-consult-validation-factory";

export function cancelConsultControllerFactory(): Controller {
    return new CancelConsultController(cancelConsultValidationFactory(), cancelConsultFactory())
}
import { AddConsultController } from "@infra/controllers";
import { addConsultFactory } from "../use-cases";
import { Controller } from "@infra/protocols";
import { addConsultValidationFactory } from "../validators/add-consult-validation-factory";

export function addConsultControllerFactory(): Controller {
    return new AddConsultController(addConsultValidationFactory(), addConsultFactory())
}
import { Controller } from "@infra/protocols";
import { listSpecialtiesFactory } from "../use-cases";
import { ListSpecialtiesController } from "@infra/controllers";

export function listSpecialtiesControllerFactory(): Controller {
    return new ListSpecialtiesController(listSpecialtiesFactory())
}
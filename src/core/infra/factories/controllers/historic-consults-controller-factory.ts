import { Controller } from "@infra/protocols";
import { historicConsultsFactory } from "../use-cases";
import { HistoricConsultsController } from "@infra/controllers";

export function historicConsultsControllerFactory(): Controller {
    return new HistoricConsultsController(historicConsultsFactory())
}
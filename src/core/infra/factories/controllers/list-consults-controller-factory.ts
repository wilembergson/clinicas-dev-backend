import { Controller } from "@infra/protocols";
import { listConsultsFactory } from "../use-cases";
import { ListConsultsController } from "@infra/controllers";

export function listConsultsControllerFactory(): Controller {
    return new ListConsultsController(listConsultsFactory())
}
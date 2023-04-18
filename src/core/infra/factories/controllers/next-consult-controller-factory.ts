import { Controller } from "@infra/protocols";
import { nextConsultFactory } from "../use-cases";
import { NextConsultController } from "@infra/controllers/next-consult-controller";

export function nextConsultControllerFactory(): Controller {
    return new NextConsultController(nextConsultFactory())
}
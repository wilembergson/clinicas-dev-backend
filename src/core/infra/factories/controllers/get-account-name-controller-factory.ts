import { Controller } from "@infra/protocols";
import { GetAccountNameController } from "@infra/controllers";

export function getAccountNameControllerFactory(): Controller {
    return new GetAccountNameController()
}
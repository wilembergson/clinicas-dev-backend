import { loginValidationFactory } from "../validators/login-validation-factory";
import { LoginController } from "@infra/controllers/login-controller";
import { Controller } from "@infra/protocols";
import { loginFactory } from "../use-cases";

export function loginControllerFactory(): Controller {
    return new LoginController(loginValidationFactory(), loginFactory())
}
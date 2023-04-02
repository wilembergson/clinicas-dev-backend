import { loginValidationFactory } from "../validators/login-validation-factory";
import { Controller } from "@infra/protocols";
import { loginFactory } from "../use-cases";
import { LoginController } from "@infra/controllers";

export function loginControllerFactory(): Controller {
    return new LoginController(loginValidationFactory(), loginFactory())
}
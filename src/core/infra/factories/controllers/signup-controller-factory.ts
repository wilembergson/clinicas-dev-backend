import { signupValidationFactory } from "../validators/signup-validation-factory";
import { SignupController } from "@infra/controllers/signup-controller";
import { Controller } from "@infra/protocols";
import { signupFactory } from "../use-cases";


export function signupControllerFactory(): Controller {
    return new SignupController(signupValidationFactory(), signupFactory())
}
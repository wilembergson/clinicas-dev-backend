import { SignupController } from "../../controllers/signup-controller";
import { Controller } from "../../protocols";
import { signupFactory } from "../use-cases/signup-factory";
import { signupValidationFactory } from "../validators/signup-validation-factory";

export function signupControllerFactory(): Controller {
    return new SignupController(signupValidationFactory(),signupFactory())
}
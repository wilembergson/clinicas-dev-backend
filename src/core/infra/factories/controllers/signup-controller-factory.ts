import { SignupController } from "../../controllers/signup-controller";
import { Controller } from "../../protocols";
import { signupFactory } from "../use-cases/signup-factory";

export function signupControllerFactory(): Controller {
    return new SignupController(signupFactory())
}
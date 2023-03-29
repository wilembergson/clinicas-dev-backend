import { Signup } from "../../domain/use-cases/signup";
import { created, serverError } from "../http/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class SignupController implements Controller {
    constructor(
        private readonly signupUsecase: Signup
    ) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            await this.signupUsecase.execute(httpRequest.body)
            return created()
        } catch (error) {
            return serverError(error.statuscode)
        }
    }

}
import { Signup } from "@domain/use-cases/signup-login";
import { badRequest, created, serverError } from "@infra/http/http-helper";
import { Controller, HttpRequest, HttpResponse, Validation } from "@infra/protocols";

export class SignupController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly signupUsecase: Signup
    ) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = await this.validation.validate(httpRequest)
            if(error) return badRequest(error)
            await this.signupUsecase.execute(httpRequest.body)
            return created("Account created.")
        } catch (error) {
            return serverError(error)
        }
    }

}
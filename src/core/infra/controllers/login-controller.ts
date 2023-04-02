import { Controller, HttpRequest, HttpResponse, Validation } from "@infra/protocols";
import { badRequest, logged, serverError } from "@infra/http/http-helper";
import { Login } from "@domain/use-cases/signup-login";

export class LoginController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly loginUsecase: Login
    ) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = await this.validation.validate(httpRequest)
            if(error) return badRequest(error)
            const token = await this.loginUsecase.execute(httpRequest.body)
            return logged(token)
        } catch (error) {
            return serverError(error.statuscode)
        }
    }

}
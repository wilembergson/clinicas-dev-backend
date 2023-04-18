import { NextConsult } from "@domain/use-cases/consult";
import { ok, serverError } from "@infra/http/http-helper";
import { Controller, HttpRequest, HttpResponse } from "@infra/protocols";

export class NextConsultController implements Controller {
    constructor(
        private readonly nextConsultUsecase: NextConsult
    ) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { sessionAccount } = httpRequest
            const consults = await this.nextConsultUsecase.execute(sessionAccount)
            return ok(consults)
        } catch (error) {
            return serverError(error)
        }
    }

}
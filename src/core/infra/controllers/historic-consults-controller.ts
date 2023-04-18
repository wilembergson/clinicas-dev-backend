import { ok, serverError } from "@infra/http/http-helper";
import { HistoricConsults } from "@domain/use-cases/consult";
import { Controller, HttpRequest, HttpResponse } from "@infra/protocols";

export class HistoricConsultsController implements Controller {
    constructor(
        private readonly historicConsultsUsecase: HistoricConsults
    ) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { sessionAccount } = httpRequest
            const consults = await this.historicConsultsUsecase.execute(sessionAccount)
            return ok(consults)
        } catch (error) {
            return serverError(error)
        }
    }
}
import { CancelConsult } from "@domain/use-cases/consult";
import { badRequest, created, ok, serverError } from "@infra/http/http-helper";
import { Controller, HttpRequest, HttpResponse, Validation } from "@infra/protocols";

export class CancelConsultController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly cancelConsultUsecase: CancelConsult
    ) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { params } = httpRequest
            const error = await this.validation.validate(httpRequest)
            if (error) return badRequest(error)
            await this.cancelConsultUsecase.execute(params.id)
            return ok({ message: "Consulta desmarcada" })
        } catch (error) {
            return serverError(error)
        }
    }

}
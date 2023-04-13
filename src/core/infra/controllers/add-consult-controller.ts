import { AddAddress } from "@domain/use-cases/address";
import { AddConsult } from "@domain/use-cases/consult/add-consult";
import { badRequest, created, serverError } from "@infra/http/http-helper";
import { Controller, HttpRequest, HttpResponse, Validation } from "@infra/protocols";

export class AddConsultController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly addConsultUsecase: AddConsult
    ) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { body, sessionAccount} = httpRequest
            const error = await this.validation.validate(httpRequest)
            if(error) return badRequest(error)
            await this.addConsultUsecase.execute(body, sessionAccount)
            return created("Consult saved.")
        } catch (error) {
            return serverError(error)
        }
    }

}
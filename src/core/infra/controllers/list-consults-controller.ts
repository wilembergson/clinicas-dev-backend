import { AddAddress } from "@domain/use-cases/address";
import { ListConsults } from "@domain/use-cases/consult";
import { AddConsult } from "@domain/use-cases/consult/add-consult";
import { badRequest, created, ok, serverError } from "@infra/http/http-helper";
import { Controller, HttpRequest, HttpResponse, Validation } from "@infra/protocols";

export class ListConsultsController implements Controller {
    constructor(
        private readonly listConsultsUsecase: ListConsults
    ) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { sessionAccount } = httpRequest
            const consults = await this.listConsultsUsecase.execute(sessionAccount)
            return ok(consults)
        } catch (error) {
            return serverError(error)
        }
    }

}
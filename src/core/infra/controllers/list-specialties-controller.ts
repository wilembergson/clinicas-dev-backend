import { ok, serverError } from "@infra/http/http-helper";
import { ListSpecialties } from "@domain/use-cases/specialty";
import { Controller, HttpRequest, HttpResponse } from "@infra/protocols";

export class ListSpecialtiesController implements Controller {
    constructor(
        private readonly listSpecialtiesUsecase: ListSpecialties
    ) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const specialties = await this.listSpecialtiesUsecase.execute()
        return ok(specialties)
    }
}
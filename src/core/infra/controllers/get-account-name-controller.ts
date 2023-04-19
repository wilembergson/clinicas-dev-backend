import { ok, serverError } from "@infra/http/http-helper";
import { Controller, HttpRequest, HttpResponse, Validation } from "@infra/protocols";

export class GetAccountNameController implements Controller {
    constructor() { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { sessionAccount } = httpRequest
        return ok({
            name: sessionAccount.getState().name
        })
    }
}
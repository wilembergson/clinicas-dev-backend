import { GetAddressById } from "@domain/use-cases/address";
import { badRequest, ok, serverError } from "@infra/http/http-helper";
import { Controller, HttpRequest, HttpResponse, Validation } from "@infra/protocols";

export class GetAddressByIdController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly getAddressByIdUsecase: GetAddressById
    ) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { sessionAccount } = httpRequest
            const error = await this.validation.validate(httpRequest)
            if(error) return badRequest(error)
            const address = await this.getAddressByIdUsecase.execute(sessionAccount.getState().addressId)
            return ok(address)
        } catch (error) {
            return serverError(error)
        }
    }

}
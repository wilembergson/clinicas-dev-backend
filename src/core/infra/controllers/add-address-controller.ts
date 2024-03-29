import { AddAddress } from "@domain/use-cases/address";
import { badRequest, created, serverError } from "@infra/http/http-helper";
import { Controller, HttpRequest, HttpResponse, Validation } from "@infra/protocols";

export class AddAddressController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly addAddressUsecase: AddAddress
    ) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { body, sessionAccount} = httpRequest
            const error = await this.validation.validate(httpRequest)
            if(error) return badRequest(error)
            await this.addAddressUsecase.execute(body, sessionAccount)
            return created("Endereço salvo")
        } catch (error) {
            return serverError(error)
        }
    }

}
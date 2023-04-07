import { UpdateAddress } from "@domain/use-cases/address";
import { badRequest, ok, serverError } from "@infra/http/http-helper";
import { Controller, HttpRequest, HttpResponse, Validation } from "@infra/protocols";

export class UpdateAddressController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly updateAddressUsecase: UpdateAddress
    ) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { body } = httpRequest
            const error = await this.validation.validate(httpRequest)
            if (error) return badRequest(error)
            await this.updateAddressUsecase.execute(body)
            return ok({ message: "Address updated." })
        } catch (error) {
            return serverError(error)
        }
    }

}
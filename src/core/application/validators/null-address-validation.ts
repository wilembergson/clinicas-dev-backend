import { BaseException, NullAddressException } from "@application/exceptions";
import { HttpRequest, Validation } from "@infra/protocols";

export class NullAddressValidation implements Validation {
    constructor(
    ) { }

    async validate(input: HttpRequest): Promise<BaseException> {
        const { sessionAccount } = input
        if (!sessionAccount.getState().addressId) return new NullAddressException()
    }
}
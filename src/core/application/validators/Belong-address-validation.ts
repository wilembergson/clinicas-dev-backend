import { BaseException, NotBelongAddressException } from "@application/exceptions";
import { HttpRequest, Validation } from "@infra/protocols";

export class BelongAddressValidation implements Validation {
    constructor(
    ) { }

    async validate(input: HttpRequest): Promise<BaseException> {
        const address = input.body
        const account = input.sessionAccount.getState()
        if (address.id !== account.addressId) return new NotBelongAddressException()
    }
}
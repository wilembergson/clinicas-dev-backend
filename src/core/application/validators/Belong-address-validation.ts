import { BaseException, NotBelongAddressException } from "@application/exceptions";
import { HttpRequest, Validation } from "@infra/protocols";

export class BelongAddressValidation implements Validation {
    constructor(
    ) { }

    async validate(input: HttpRequest): Promise<BaseException> {
        const addressId = input.body.id
        const account = input.sessionAccount.getState()
        if (addressId !== account.addressId) return new NotBelongAddressException()
    }
}
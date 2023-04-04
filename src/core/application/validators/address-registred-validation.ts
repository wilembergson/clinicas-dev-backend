import { AlreadAddressRegistredException, BaseException } from "@application/exceptions";
import { HttpRequest, Validation } from "@infra/protocols";

export class AddressRegistredValidation implements Validation{
    constructor(
    ){}
    
    async validate(input: HttpRequest): Promise<BaseException> {
        const account = input.sessionAccount.getState()
        if(account.addressId) return new AlreadAddressRegistredException()
    }
}
import { BaseException } from "./base-exception";

export class AlreadAddressRegistredException extends BaseException {
  constructor() {
    super('AlreadAddressRegistred', 'Address alread registred.', 403)
  }
}
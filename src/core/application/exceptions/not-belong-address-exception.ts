import { BaseException } from "./base-exception";

export class NotBelongAddressException extends BaseException {
  constructor() {
    super('NotBelongAddressException', 'Address not belong to this account.', 401)
  }
}
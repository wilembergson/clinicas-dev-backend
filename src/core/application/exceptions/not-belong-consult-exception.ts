import { BaseException } from "./base-exception";

export class NotBelongConsultException extends BaseException {
  constructor() {
    super('NotBelongConsultException', 'Consult not belong to this account.', 401)
  }
}
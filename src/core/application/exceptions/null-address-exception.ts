import { BaseException } from "./base-exception";

export class NullAddressException extends BaseException {
  constructor() {
    super('NullAddress', 'No address registred.', 403)
  }
}
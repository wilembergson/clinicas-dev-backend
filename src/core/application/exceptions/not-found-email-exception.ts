import { BaseException } from "./base-exception";

export class NotFoundEmailException extends BaseException {
  constructor() {
    super('NotFoundEmailException', 'Email not found', 404)
  }
}
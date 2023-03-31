import { BaseException } from "./base-exception"

export class InvalidEmailException extends BaseException {
  constructor() {
    super(
      'InvalidEmailError',
      'Invalid email format',
      422
    )
  }
}
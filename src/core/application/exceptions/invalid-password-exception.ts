import { BaseException } from "./base-exception"

export class InvalidPasswordException extends BaseException {
  constructor() {
    super(
      'InvalidPasswordError',
      'Invalid password',
      401
    )
  }
}
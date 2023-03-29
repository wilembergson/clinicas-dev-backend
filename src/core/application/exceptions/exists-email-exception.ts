import { BaseException } from "./base-exception"

export class ExistsEmailException extends BaseException {
  constructor() {
    super(
      'ExistsEmailException',
      'Email alread in use',
      405
    )
  }
}
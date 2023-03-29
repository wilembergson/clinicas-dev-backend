import { BaseException } from "./base-exception"

export class InvalidCpfException extends BaseException {
  constructor() {
    super(
      'InvalidCPFError',
      'Invalid CPF',
      422
    )
  }
}
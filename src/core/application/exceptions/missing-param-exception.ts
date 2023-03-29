import { BaseException } from "./base-exception"

export class MissingParamError extends BaseException {
  constructor(paramName: string) {
    super(
      'MissingParamError',
      `Missing param: ${paramName}`,
      422
    )
  }
}
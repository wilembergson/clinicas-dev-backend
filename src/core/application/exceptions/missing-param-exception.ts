import { BaseException } from "./base-exception"

export class MissingParamError extends BaseException {
  constructor(paramName: string) {
    super(
      'MissingParamError',
      `${paramName}`,
      422
    )
  }
}
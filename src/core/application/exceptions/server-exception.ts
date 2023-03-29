import { BaseException } from "./base-exception"

export class ServerError extends BaseException {
  constructor(stack: string) {
    super('ServerError', 'Internal server error', 500, stack)
  }
}
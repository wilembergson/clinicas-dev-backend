import { BaseException } from "./base-exception"

export class ServerException extends BaseException {
  constructor(stack: string) {
    super('ServerError', 'Internal server error', 500, stack)
  }
}
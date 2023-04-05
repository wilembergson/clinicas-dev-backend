import { BaseException } from "./base-exception"

export class ExpiredTokenException extends BaseException {
  constructor(error: Error) {
    super(error.name, 'session expired.', 401)
  }
}
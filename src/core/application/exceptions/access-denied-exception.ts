import { BaseException } from "./base-exception"

export class AccessDeniedException extends BaseException {
  constructor() {
    super('AccessDeniedException', 'Access denied.', 401)
  }
}
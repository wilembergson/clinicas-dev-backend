import { BaseException } from "./base-exception";

export class NotFoundSpecialtyException extends BaseException {
  constructor() {
    super('NotFoundSpecialtyException', 'Specialty not found', 404)
  }
}
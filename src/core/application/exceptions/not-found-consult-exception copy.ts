import { BaseException } from "./base-exception";

export class NotFoundConsultException extends BaseException {
  constructor() {
    super('NotFoundConsultException', 'Consult not found', 404)
  }
}
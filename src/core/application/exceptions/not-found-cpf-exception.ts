import { BaseException } from "./base-exception";

export class NotFoundCpfException extends BaseException {
  constructor() {
    super('NotFoundCpfException', 'CPF not found', 404)
  }
}
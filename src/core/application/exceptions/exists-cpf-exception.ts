import { BaseException } from "./base-exception"

export class ExistsCpfException extends BaseException {
  constructor() {
    super('ExistsCpfException', 'CPF alread registred', 405)
  }
}
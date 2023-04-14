import { BaseException } from "./base-exception";

export class AlreadMarkedConsultException extends BaseException {
  constructor() {
    super('AlreadMarkedConsultException', `Você já tem Consulta mancada para esta especialidade neste dia.`, 405)
  }
}
import { BaseException } from "./base-exception";

export class NotBelongSpecialtyDayException extends BaseException {
  constructor(specialty: string) {
    super('NotBelongSpecialtyDayException', `Não há vaga para ${specialty} neste dia. Tente outro.`, 403)
  }
}
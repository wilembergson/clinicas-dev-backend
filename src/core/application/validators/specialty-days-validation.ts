import { BaseException, NotBelongSpecialtyDayException } from "@application/exceptions"
import { FindSpecialtyByName } from "@domain/use-cases/specialty"
import { HttpRequest, Validation } from "@infra/protocols"
import moment from "moment-timezone"

export class SpecialtyDaysValidation implements Validation {
    constructor(
        private readonly findSpecialty: FindSpecialtyByName
    ) { }

    async validate(input: HttpRequest): Promise<BaseException> {
        const { specialty, date} = input.body
        const foundSpecialty = await this.findSpecialty.execute(specialty)
        const day = new Date(date)
        const available = foundSpecialty.getAvailableDays().includes(day.getDay()+1)
        if(!available) return new NotBelongSpecialtyDayException(specialty)
    }

}
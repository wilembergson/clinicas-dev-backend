import Joi from "joi";
import moment from 'moment-timezone'

type ConsultBody = {
    specialty: string
    date: Date
}
const minDate = new Date(moment.tz('America/Sao_Paulo').format())
minDate.setHours(0)
export const consultSchema = Joi.object<ConsultBody>({
    specialty: Joi.string().required(),
    date: Joi.date().min(minDate).required()
})
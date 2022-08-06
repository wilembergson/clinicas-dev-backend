import Joi from "joi"
import { ConsultBody } from "../service/consultService.js"

export const consultSchema = Joi.object<ConsultBody>({
    specialtyName: Joi.string().required(),
    date: Joi.string().required()
})
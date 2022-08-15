import Joi from "joi"
import { SpeciatiesDaysInsertData } from "../repository/speciatiesDaysRepository"

export const specialtiesDaysSchema = Joi.object<SpeciatiesDaysInsertData>({
    specialtyId: Joi.number().required(),
    daysId: Joi.number().required()
})
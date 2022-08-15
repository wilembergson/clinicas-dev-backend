import Joi from "joi"

import { DayInsertData } from "../repository/dayRepository"

export const daySchema = Joi.object<DayInsertData>({
    name: Joi.string().required()
})
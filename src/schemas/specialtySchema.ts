import Joi from "joi"
import { SpecialtyInsertData } from "../repository/specialtyRepository"

export const specialtySchema = Joi.object<SpecialtyInsertData>({
    name: Joi.string().required()
})
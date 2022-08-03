import Joi from "joi"

import { LoginBody } from "../service/authService.js"

export const loginSchema = Joi.object<LoginBody>({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})
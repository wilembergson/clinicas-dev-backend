import Joi from "joi";
import { userBody } from "../service/authService";

export const userSchema = Joi.object<userBody>({
    cpf: Joi.string().length(11).required(),
    name:Joi.string().required(),
    birthDate: Joi.string().required(),
    phone:Joi.string().length(11).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    repeatPassword: Joi.string().min(8).required()
})
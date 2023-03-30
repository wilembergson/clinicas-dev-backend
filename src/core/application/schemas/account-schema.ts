import { Account } from "@prisma/client";
import Joi from "joi";

type AccountBody = Omit<Account, 'id'>

export const accountSchema = Joi.object<AccountBody>({
    cpf: Joi.string().required(),
    name:Joi.string().required(),
    birthdate: Joi.date().required(),
    phone:Joi.string().length(11).required(),
    email: Joi.string().required(),
    password: Joi.string().required()
})
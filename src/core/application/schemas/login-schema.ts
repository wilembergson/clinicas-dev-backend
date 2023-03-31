import { Account } from "@prisma/client";
import Joi from "joi";

type LoginBody = {
    email: string,
    password: string
}

export const loginSchema = Joi.object<LoginBody>({
    email: Joi.string().required(),
    password: Joi.string().required()
})
import { Address } from "@prisma/client";
import Joi from "joi";

export const updateAddressSchema = Joi.object<Address>({
    id: Joi.string().required(),
    number: Joi.string().required(),
    street: Joi.string().required(),
    district: Joi.string().required(),
    city: Joi.string().required(),
    uf: Joi.string().length(2).required()
})
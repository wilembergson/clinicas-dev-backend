import { Address } from "@prisma/client";
import Joi from "joi";

type AddressBody = Omit<Address, 'id'>

export const addressSchema = Joi.object<AddressBody>({
    number: Joi.string().required(),
    street: Joi.string().required(),
    district: Joi.string().required(),
    city: Joi.string().required(),
    uf: Joi.string().length(2).required()
})
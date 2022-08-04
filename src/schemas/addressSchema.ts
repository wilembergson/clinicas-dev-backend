import Joi from "joi"

import { AddressBody } from "../service/addressService.js"

export const addressSchema = Joi.object<AddressBody>({
    number: Joi.string().required(),
    street:Joi.string().required(),
    district: Joi.string().required(),
    city:Joi.string().required(),
    uf: Joi.string().length(2).required()
})
import { Router } from "express"

import { createAddress, getAddress, updateAddress } from "../controller/addressController.js"
import { validateSchemaAndTokenMiddleware } from "../middlewares/validateSchemaAndToken.js"
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js"
import { addressSchema, updateAddressSchema } from "../schemas/addressSchema.js"

const addressRouter = Router()

addressRouter.post("/address", validateSchemaAndTokenMiddleware(addressSchema), createAddress)
addressRouter.get("/address", validateTokenMiddleware(), getAddress)
addressRouter.put("/address", validateSchemaAndTokenMiddleware(updateAddressSchema), updateAddress)

export default addressRouter
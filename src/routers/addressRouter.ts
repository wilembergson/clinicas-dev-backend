import { Router } from "express"

import { createAddress, getAddress } from "../controller/addressController.js"
import { validateSchemaAndTokenMiddleware } from "../middlewares/validateSchemaAndToken.js"
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js"
import { addressSchema } from "../schemas/addressSchema.js"

const addressRouter = Router()

addressRouter.post("/address", validateSchemaAndTokenMiddleware(addressSchema), createAddress)
addressRouter.get("/address", validateTokenMiddleware(), getAddress)

export default addressRouter
import { Router } from "express"

import { createNewConsult, listMyConsults } from "../controller/consultController.js"
import { validateSchemaAndTokenMiddleware } from "../middlewares/validateSchemaAndToken.js"
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js"
import { consultSchema } from "../schemas/consultSchema.js"

const consultRouter = Router()

consultRouter.post("/consult", validateSchemaAndTokenMiddleware(consultSchema), createNewConsult)
consultRouter.get("/consult", validateTokenMiddleware(), listMyConsults)

export default consultRouter
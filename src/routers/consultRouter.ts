import { Router } from "express"

import { createNewConsult, listMyConsults, nextConsults } from "../controller/consultController.js"
import { validateSchemaAndTokenMiddleware } from "../middlewares/validateSchemaAndToken.js"
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js"
import { consultSchema } from "../schemas/consultSchema.js"

const consultRouter = Router()

consultRouter.post("/consult", validateSchemaAndTokenMiddleware(consultSchema), createNewConsult)
consultRouter.get("/consult", validateTokenMiddleware(), listMyConsults)
consultRouter.get("/next-consults", validateTokenMiddleware(), nextConsults)

export default consultRouter
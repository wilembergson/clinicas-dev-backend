import { Router } from "express"

import { createNewConsult } from "../controller/consultController.js"
import { validateSchemaAndTokenMiddleware } from "../middlewares/validateSchemaAndToken.js"
import { consultSchema } from "../schemas/consultSchema.js"

const consultRouter = Router()

consultRouter.get("/consult", validateSchemaAndTokenMiddleware(consultSchema), createNewConsult)

export default consultRouter
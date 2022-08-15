import { Router } from "express";
import { newDay } from "../controller/dayController.js"
import { validateSchemaAndTokenMiddleware } from "../middlewares/validateSchemaAndToken.js";
import { daySchema } from "../schemas/daySchema.js";

const dayRouter = Router()

dayRouter.post("/day", validateSchemaAndTokenMiddleware(daySchema), newDay)

export default dayRouter
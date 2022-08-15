import { Router } from "express"

import { getDaysAvailable, getSpecialtyByName, listSpecialties, newSpecialty } from "../controller/specialtyController.js"
import { validateSchemaAndTokenMiddleware } from "../middlewares/validateSchemaAndToken.js"
import { specialtySchema } from "../schemas/specialtySchema.js"

const specialtyRouter = Router()

specialtyRouter.post("/specialty", validateSchemaAndTokenMiddleware(specialtySchema), newSpecialty)
specialtyRouter.get("/specialty", getSpecialtyByName)
specialtyRouter.get("/specialties", listSpecialties)
specialtyRouter.get("/specialty-days/:name", getDaysAvailable)

export default specialtyRouter
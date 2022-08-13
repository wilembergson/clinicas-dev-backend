import { Router } from "express"

import { getDaysAvailable, getSpecialtyByName, listSpecialties } from "../controller/specialtyController.js"

const specialtyRouter = Router()

specialtyRouter.get("/specialty", getSpecialtyByName)
specialtyRouter.get("/specialties", listSpecialties)
specialtyRouter.get("/specialty-days/:name", getDaysAvailable)

export default specialtyRouter
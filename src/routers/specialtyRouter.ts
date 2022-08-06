import { Router } from "express"

import { getSpecialtyByName, listSpecialties } from "../controller/specialtyController.js"

const specialtyRouter = Router()

specialtyRouter.get("/specialty", getSpecialtyByName)
specialtyRouter.get("/specialties", listSpecialties)

export default specialtyRouter
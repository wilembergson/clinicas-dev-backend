import { Router } from "express"

import { getSpecialtyByName, listSpecialties } from "../controller/consultController.js"

const consultRouter = Router()

consultRouter.get("/specialty", getSpecialtyByName)
consultRouter.get("/specialties", listSpecialties)

export default consultRouter
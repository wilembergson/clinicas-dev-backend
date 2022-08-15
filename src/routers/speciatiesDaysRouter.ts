import { Router } from "express";
import { newSpeciatiesDays } from "../controller/specialtiesDaysController.js";
import { validateSchemaAndTokenMiddleware } from "../middlewares/validateSchemaAndToken.js";
import { specialtiesDaysSchema } from "../schemas/specialtiesDaysSchema.js";

const specialtiesDaysRouter = Router()

specialtiesDaysRouter.post("/specialties-days", validateSchemaAndTokenMiddleware(specialtiesDaysSchema), newSpeciatiesDays)

export default specialtiesDaysRouter
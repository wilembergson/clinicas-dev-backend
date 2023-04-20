import { Router } from "express";
import { auth } from "@infra/middlewares";
import { adaptRoute } from "@infra/adapters";
import { listSpecialtiesControllerFactory } from "@infra/factories/controllers";

const specialtyRouter = Router()

specialtyRouter.get('/specialties', auth, adaptRoute(listSpecialtiesControllerFactory()))

export default specialtyRouter
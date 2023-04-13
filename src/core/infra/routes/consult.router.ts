import { Router } from "express";
import { auth } from "@infra/middlewares";
import { adaptRoute } from "@infra/adapters";
import {
    addConsultControllerFactory
} from "@infra/factories/controllers";

const consultRouter = Router()

consultRouter.post('/consult', auth, adaptRoute(addConsultControllerFactory()))

export default consultRouter
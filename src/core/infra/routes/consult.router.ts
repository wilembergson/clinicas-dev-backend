import { Router } from "express";
import { auth } from "@infra/middlewares";
import { adaptRoute } from "@infra/adapters";
import {
    addConsultControllerFactory,
    listConsultsControllerFactory
} from "@infra/factories/controllers";

const consultRouter = Router()

consultRouter.post('/consult', auth, adaptRoute(addConsultControllerFactory()))
consultRouter.get('/consult-list', auth, adaptRoute(listConsultsControllerFactory()))

export default consultRouter
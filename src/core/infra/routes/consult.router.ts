import { Router } from "express";
import { auth } from "@infra/middlewares";
import { adaptRoute } from "@infra/adapters";
import {
    addConsultControllerFactory,
    cancelConsultControllerFactory,
    historicConsultsControllerFactory,
    listConsultsControllerFactory,
    nextConsultControllerFactory
} from "@infra/factories/controllers";

const consultRouter = Router()

consultRouter.post('/consult', auth, adaptRoute(addConsultControllerFactory()))
consultRouter.get('/consult-list', auth, adaptRoute(listConsultsControllerFactory()))
consultRouter.get('/next-consult', auth, adaptRoute(nextConsultControllerFactory()))
consultRouter.get('/historic-consults', auth, adaptRoute(historicConsultsControllerFactory()))
consultRouter.put('/cancel-consult/:id', auth, adaptRoute(cancelConsultControllerFactory()))

export default consultRouter
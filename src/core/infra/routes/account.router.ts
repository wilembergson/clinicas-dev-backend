import { Router } from "express";
import { auth } from "@infra/middlewares";
import { adaptRoute } from "@infra/adapters";
import { getAccountNameControllerFactory } from "@infra/factories/controllers";

const accountRouter = Router()

accountRouter.get('/account-name', auth, adaptRoute(getAccountNameControllerFactory()))

export default accountRouter
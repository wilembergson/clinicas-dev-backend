import { Router } from "express";
import signupRouter from "./signup-login.router";
import addressRouter from "./address.router";
import consultRouter from "./consult.router";
import accountRouter from "./account.router";

const serverRouter = Router()

serverRouter.use(addressRouter)
serverRouter.use(signupRouter)
serverRouter.use(consultRouter)
serverRouter.use(accountRouter)

export default serverRouter
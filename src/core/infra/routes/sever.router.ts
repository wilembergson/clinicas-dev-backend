import { Router } from "express";
import signupRouter from "./signup-login.router";
import addressRouter from "./address.router";

const serverRouter = Router()

serverRouter.use(addressRouter)
serverRouter.use(signupRouter)

export default serverRouter
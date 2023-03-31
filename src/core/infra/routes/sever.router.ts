import { Router } from "express";
import signupRouter from "./signup-login.router";

const serverRouter = Router()

serverRouter.use(signupRouter)

export default serverRouter
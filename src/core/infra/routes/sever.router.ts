import { Router } from "express";
import signupRouter from "./signup.router";

const serverRouter = Router()

serverRouter.use(signupRouter)

export default serverRouter
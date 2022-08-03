import { Router } from "express";
import authRouter from "./authRouter.js"

const routerIndex = Router()

routerIndex.use(authRouter)

export default routerIndex
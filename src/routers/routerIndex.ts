import { Router } from "express";
import addressRouter from "./addressRouter.js";
import authRouter from "./authRouter.js"

const routerIndex = Router()

routerIndex.use(authRouter)
routerIndex.use(addressRouter)

export default routerIndex
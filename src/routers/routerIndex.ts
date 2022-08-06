import { Router } from "express";
import addressRouter from "./addressRouter.js";
import authRouter from "./authRouter.js"
import consultRouter from "./consultRouter.js";
import specialtyRouter from "./specialtyRouter.js";

const routerIndex = Router()

routerIndex.use(authRouter)
routerIndex.use(addressRouter)
routerIndex.use(specialtyRouter)
routerIndex.use(consultRouter)

export default routerIndex
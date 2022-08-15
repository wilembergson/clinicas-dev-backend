import { Router } from "express";
import addressRouter from "./addressRouter.js";
import authRouter from "./authRouter.js"
import consultRouter from "./consultRouter.js";
import dayRouter from "./dayRouter.js";
import getDataTokenRouter from "./getDataTokenRouter.js";
import specialtyRouter from "./specialtyRouter.js";
import specialtiesDaysRouter from "./speciatiesDaysRouter.js";

const routerIndex = Router()

routerIndex.use(authRouter)
routerIndex.use(addressRouter)
routerIndex.use(specialtyRouter)
routerIndex.use(consultRouter)
routerIndex.use(getDataTokenRouter)
routerIndex.use(dayRouter)
routerIndex.use(specialtiesDaysRouter)

export default routerIndex
import { Router } from "express";
import { getUserNameFromToken } from "../controller/getTokenDataController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const getDataTokenRouter = Router()

getDataTokenRouter.get('/get-user-name', validateTokenMiddleware(), getUserNameFromToken)

export default getDataTokenRouter
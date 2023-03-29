import { Router } from "express";
import { adaptRoute } from "../adapters";
import { signupControllerFactory } from "../factories/controllers";

const signupRouter = Router()

signupRouter.post('/signup', adaptRoute(signupControllerFactory()))

export default signupRouter
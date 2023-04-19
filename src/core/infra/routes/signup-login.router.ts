import { Router } from "express";
import { adaptRoute } from "@infra/adapters";
import { loginControllerFactory, signupControllerFactory } from "@infra/factories/controllers";

const signupRouter = Router()

signupRouter.post('/signup', adaptRoute(signupControllerFactory()))
signupRouter.post('/login', adaptRoute(loginControllerFactory()))

export default signupRouter
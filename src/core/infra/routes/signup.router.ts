import { adaptRoute } from "@infra/adapters";
import { signupControllerFactory } from "@infra/factories/controllers";
import { Router } from "express";

const signupRouter = Router()

signupRouter.post('/signup', adaptRoute(signupControllerFactory()))

export default signupRouter
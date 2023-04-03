import { Router } from "express";
import { adaptRoute } from "@infra/adapters";
import { addAddressControllerFactory } from "@infra/factories/controllers";
import { auth } from "@infra/middlewares";

const addressRouter = Router()

addressRouter.post('/address', auth, adaptRoute(addAddressControllerFactory()))

export default addressRouter
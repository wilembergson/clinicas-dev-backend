import { Router } from "express";
import { adaptRoute } from "@infra/adapters";
import { addAddressControllerFactory } from "@infra/factories/controllers";

const addressRouter = Router()

addressRouter.post('/address', adaptRoute(addAddressControllerFactory()))

export default addressRouter
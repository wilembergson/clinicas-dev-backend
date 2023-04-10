import { Router } from "express";
import { auth } from "@infra/middlewares";
import { adaptRoute } from "@infra/adapters";
import {
    addAddressControllerFactory,
    getAddressByIdControllerFactory,
    updateAddressControllerFactory
} from "@infra/factories/controllers";

const addressRouter = Router()

addressRouter.post('/address', auth, adaptRoute(addAddressControllerFactory()))
addressRouter.put('/address', auth, adaptRoute(updateAddressControllerFactory()))
addressRouter.get('/address', auth, adaptRoute(getAddressByIdControllerFactory()))

export default addressRouter
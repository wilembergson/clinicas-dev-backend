import { Router } from "express"

import { createNewUser } from "../controller/authController.js"
import { authSchemaMiddleware } from "../middlewares/validateAuthSchemas.js"
import { userSchema } from "../schemas/userSchema.js"

const authRouter = Router()

authRouter.post("/user", authSchemaMiddleware(userSchema), createNewUser)

export default authRouter
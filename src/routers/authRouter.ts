import { Router } from "express"

import { createNewUser } from "../controller/authController.js"

const authRouter = Router()

authRouter.post("/user", createNewUser)

export default authRouter
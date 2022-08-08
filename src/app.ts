import express, { json } from "express"
import cors from "cors"
import "express-async-errors"
import dotenv from "dotenv"

import routerIndex from "./routers/routerIndex.js"
import errorHandler from "./middlewares/errorHandlerMiddleware.js"

dotenv.config()

const app = express()
app.use(json())
app.use(cors())

app.use(routerIndex)
app.use(errorHandler)

export default app
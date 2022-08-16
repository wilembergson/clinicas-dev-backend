import express, { json } from "express"
import "express-async-errors"
import cors from "cors"

import routerIndex from "./routers/routerIndex.js"
import errorHandler from "./middlewares/errorHandlerMiddleware.js"

const app = express()
app.use(json())
app.use(cors())

app.use(routerIndex)
app.use(errorHandler)

export default app
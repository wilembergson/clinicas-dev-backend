import express, { json } from "express"
import "express-async-errors"
import dotenv from "dotenv"
dotenv.config()

const app = express()
app.use(json())

export default app
import { Request, Response } from "express"

import authService, { userBody } from "../service/authService.js"

export async function createNewUser(req:Request, res:Response){
    const newUser:userBody = req.body
    const result = await authService.newUser(newUser)
    return res.status(201).json(result)
}
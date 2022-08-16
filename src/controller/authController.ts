import { Request, Response } from "express"

import authService, { LoginBody, userBody } from "../service/authService.js"

export async function createNewUser(req:Request, res:Response){
    const newUser:userBody = req.body
    const result = await authService.newUser(newUser)
    console.log('PASSOU PELO CONTROLLER.')
    return res.status(201).json(result)
}

export async function login(req:Request, res:Response){
    const loginData:LoginBody = req.body
    const result = await authService.login(loginData)
    return res.status(200).json(result)
}
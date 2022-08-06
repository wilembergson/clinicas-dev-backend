import { Request, Response } from "express"

import consultService from "../service/consultService.js"

export async function createNewConsult(req:Request, res:Response){
    const consultData = res.locals.body
    const token = res.locals.token
    const result = await consultService.newConsult(consultData, token)
    return res.status(201).json(result)
}
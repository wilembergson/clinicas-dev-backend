import { Request, Response } from "express"
import { getUserName } from "../service/getDataTokenService.js"

export async function getUserNameFromToken(req:Request, res:Response){
    const token = res.locals.token
    const result = await getUserName(token)
    return res.status(200).json(result)
}
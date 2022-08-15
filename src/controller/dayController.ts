import { Request, Response } from "express";

import dayService from "../service/dayService.js";

export async function newDay(req:Request, res:Response){
    const dayData = res.locals.body
    const result = await dayService.newDay(dayData)
    return res.status(201).json(result)
}
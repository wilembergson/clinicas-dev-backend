import { Request, Response } from "express";
import specialtiesDaysService from "../service/speciatiesDaysService.js";

export async function newSpeciatiesDays(req:Request, res:Response){
    const specialtiesDays = res.locals.body
    const result = await specialtiesDaysService.newSpeciatiesDays(specialtiesDays)
    return res.status(201).json(result)
}
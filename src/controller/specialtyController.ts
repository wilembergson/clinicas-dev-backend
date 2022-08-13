import { Request, Response } from "express"
import specialtyService from "../service/specialtyService.js"


export async function getSpecialtyByName(req:Request, res:Response){
    const { name } = req.params
    const result = await specialtyService.getSpecialtyByName(name)
    return res.status(200).json(result)
}

export async function listSpecialties(req:Request, res:Response){
    const result = await specialtyService.getSpecialties()
    return res.status(200).json(result)
}

export async function getDaysAvailable(req:Request, res:Response){
    const { name } = req.params
    const result = await specialtyService.getDaysAvailable(name)
    return res.status(200).json(result)
}
import { Request, Response } from "express"
import addressService, { AddressBody } from "../service/addressService.js"

export async function createAddress(req:Request, res:Response){
    const address:AddressBody = res.locals.body
    const token:string = res.locals.token
    const result = await addressService.newAddress(address, token)
    return res.status(201).json(result)
}

export async function getAddress(req:Request, res:Response){
    const token:string = res.locals.token
    const result = await addressService.getAddressByUser(token)
    return res.status(200).json(result)
}
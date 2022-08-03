import { Address } from "@prisma/client"

import prisma from "../config/database.js"

export type AddressInsertData = Omit<Address, "id">

async function newAddress(address:AddressInsertData){
    return await prisma.address.create({
        data: address
    })
}
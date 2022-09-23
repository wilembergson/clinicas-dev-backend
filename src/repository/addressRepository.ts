import { Address } from "@prisma/client"

import prisma from "../config/database.js"

export type AddressInsertData = Omit<Address, "id">

async function newAddress(address:AddressInsertData){
    return await prisma.address.create({
        data: address
    })
}

async function getAddress(userId:number){
    return await prisma.usersAddresses.findFirst({
        where:{
            userId
        },
        select:{
            address:{}
        }
    })
}

async function updateAddress(addressId:number,address:AddressInsertData){
    return await prisma.address.update({
        where: {
            id:addressId
        },
        data: address
    })
}

const addressRepository = {
    newAddress,
    getAddress,
    updateAddress
}
export default addressRepository
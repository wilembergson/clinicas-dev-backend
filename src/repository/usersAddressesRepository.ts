import { Address, UsersAddresses } from "@prisma/client"

import prisma from "../config/database.js"

export type UsersAddressesInsertData = Omit<UsersAddresses, "id">

async function newUsersAddresses(usersAddresses:UsersAddressesInsertData){
    return await prisma.usersAddresses.create({
        data: usersAddresses
    })
}

const usersAddressesRepository = {
    newUsersAddresses
}
export default usersAddressesRepository
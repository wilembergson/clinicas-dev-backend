import { User } from "@prisma/client"

import prisma from "../config/database.js"

export type UserInsertData = Omit<User, "id">

async function newUser(user: UserInsertData):Promise<User>{
    return await prisma.user.create({
         data: user
     })
 }

 async function findUser(cpf:string):Promise<User>{
    return await prisma.user.findUnique({
        where:{
            cpf
        }
    })
}

async function findUserByEmail(email:string):Promise<User>{
    return await prisma.user.findFirst({
        where:{
            email
        }
    })
}

const userRepository = {
    newUser,
    findUser,
    findUserByEmail
}
export default userRepository
import { Consult } from "@prisma/client"

import prisma from "../config/database.js"

export type ConsultInsertData = Omit<Consult, "id">
async function newConsult(consult:ConsultInsertData){
    return await prisma.consult.create({
        data: consult
    })
}

async function lisMyConsults(userId:number){
    return await prisma.consult.findMany({
        where:{
            userId
        },
        include:{
            specialty:{
                
            }
        }
    })
}

const consultRepository = {
    newConsult,
    lisMyConsults
}
export default consultRepository
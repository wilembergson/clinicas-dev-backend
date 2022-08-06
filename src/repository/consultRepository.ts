import { Consult } from "@prisma/client"

import prisma from "../config/database.js"

export type ConsultInsertData = Omit<Consult, "id">
async function newConsult(consult:ConsultInsertData){
    return await prisma.consult.create({
        data: consult
    })
}

const consultRepository = {
    newConsult
}
export default consultRepository
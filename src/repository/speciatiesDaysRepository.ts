import { SpecialtiesDays } from "@prisma/client"

import prisma from "../config/database.js"

export type SpeciatiesDaysInsertData = Omit<SpecialtiesDays, "id">

async function newSpeciatiesDays(data:SpeciatiesDaysInsertData){
    return await prisma.specialtiesDays.create({
        data
    })
}

const specialtiesDaysRepository = {
    newSpeciatiesDays
}
export default specialtiesDaysRepository
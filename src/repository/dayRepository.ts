import { Days } from "@prisma/client";

import prisma from "../config/database.js";

export type DayInsertData = Omit<Days, "id">

async function newDay(day:DayInsertData){
    return await prisma.days.create({
        data:day
    })
}

const dayRepository = {
    newDay
}
export default dayRepository
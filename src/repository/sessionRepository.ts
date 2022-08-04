import { Session } from "@prisma/client";

import prisma from "../config/database.js";

export type SessionInsertData = Omit<Session, "id">

async function newSession(session: SessionInsertData){
    return await prisma.session.create({
         data: session
     })
}

const sessionRepository = {
    newSession
}
export default sessionRepository
import dayRepository, { DayInsertData } from "../repository/dayRepository.js";
import sucessMessage from "../utils/sucessMessage.js";

async function newDay(day:DayInsertData){
    await dayRepository.newDay(day)
    return sucessMessage("Novo dia adicionado.")
}

const dayService = {
    newDay
}
export default dayService
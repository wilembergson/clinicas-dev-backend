import specialtiesDaysRepository, { SpeciatiesDaysInsertData } from "../repository/speciatiesDaysRepository.js";
import sucessMessage from "../utils/sucessMessage.js";

async function newSpeciatiesDays(specialtiesDays: SpeciatiesDaysInsertData){
    await specialtiesDaysRepository.newSpeciatiesDays(specialtiesDays)
    return sucessMessage("Novo relacionamento criado.")
}

const specialtiesDaysService = {
    newSpeciatiesDays
}
export default specialtiesDaysService
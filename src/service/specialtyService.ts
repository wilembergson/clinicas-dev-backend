import specialtyRepository, { SpecialtyInsertData } from "../repository/specialtyRepository.js"
import ErrorMessage from "../utils/errorMessage.js"
import sucessMessage from "../utils/sucessMessage.js"

async function newSpecialty(specialty:SpecialtyInsertData){
    const existingSpecialty = await specialtyRepository.getSpecialty(specialty.name)
    if(existingSpecialty !== null) return ErrorMessage(404, "Esta especialidade já está cadastrada.")
    await specialtyRepository.newSpecialty(specialty)
    return sucessMessage("Especialidade cadastrada com sucesso.")
}

async function getSpecialtyByName(specialtyName:string){
    const specialty = await specialtyRepository.getSpecialtyWithDaysAndDoctors(specialtyName)
    if(!specialty) return ErrorMessage(404, "Especialidade não encontrada.")
    return specialty
}

async function getSpecialties(){
    return await specialtyRepository.getSpecialties()
}

async function getDaysAvailable(specialtyName:string){
    const specialty = await specialtyRepository.getDaysAvailable(specialtyName)
    if(!specialty) return ErrorMessage(404, "Especialidade não encontrada.")
    const daysName = getDaysName(specialty[0].specialtiesDays)
    return daysName
}
async function getDaysName(list:any[] | undefined){
    const result:string[] = []
    list.forEach(item => result.push(item.days.name))
    return result
}

const specialtyService = {
    newSpecialty,
    getSpecialties,
    getSpecialtyByName,
    getDaysAvailable
}
export default specialtyService
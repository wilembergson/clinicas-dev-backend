import specialtyRepository from "../repository/specialtyRepository.js"
import ErrorMessage from "../utils/errorMessage.js"

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
    getSpecialties,
    getSpecialtyByName,
    getDaysAvailable
}
export default specialtyService
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

const specialtyService = {
    getSpecialties,
    getSpecialtyByName
}
export default specialtyService
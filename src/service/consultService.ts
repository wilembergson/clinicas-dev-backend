import consultRepository, { ConsultInsertData } from "../repository/consultRepository.js"
import specialtyRepository from "../repository/specialtyRepository.js"
import ErrorMessage from "../utils/errorMessage.js"
import sucessMessage from "../utils/sucessMessage.js"
import getUserIdFromToken from "../utils/tokenInfo.js"

export type ConsultBody = {
    specialtyName:string,
    date:string
}

async function newConsult(consultData:ConsultBody, token:string){
    const { specialtyName, date } = consultData
    const userId = await getUserIdFromToken(token)
    const specialty = await specialtyRepository.getSpecialtyWithDaysAndDoctors(specialtyName)
    if(!specialty) return ErrorMessage(404, "Especialidade não cadastrada. Selecione uma espealidade válida.")
    const avaialiableDays = specialty.specialtiesDays
    const daysIndex = await getDaysIndex(avaialiableDays)
    const consultDate = new Date(date)
    const dateIndex = consultDate.getDay()
    if(!daysIndex.includes(dateIndex)) return ErrorMessage(401, `Não há vagas para consultas neste dia. Escolha um dia compativél.`)
    const currentDate = new Date()
    if(currentDate > consultDate) return ErrorMessage(401, "Não é permitido agendar condultas em dias passados.")
    const newConsult:ConsultInsertData = {
        date: consultDate,
        userId,
        specialtyId:specialty.id
    }
    await consultRepository.newConsult(newConsult)
    return sucessMessage("Consulta marcada com sucesso.")
}

//Get the indices for each day of the week
async function getDaysIndex(list:any[]){
    const result = []
    const days = list.map(item => item.days.name)
    days.forEach(item => {
        switch(item){
            case 'DOMINGO':
                result.push(0)
                break
            case 'SEGUNDA-FEIRA':
                result.push(1)
                break
            case 'TERÇA-FEIRA':
                result.push(2)
                break
            case 'QUARTA-FEIRA':
                result.push(3)
                break
            case 'QUINTA-FEIRA':
                result.push(4)
                break
            case 'SEXTA-FEIRA':
                result.push(5)
                break
            case 'SÁBADO':
                result.push(6)
                break
            default:
                break
        }
    })
    return result
}

const consultService = {
    newConsult
}
export default consultService
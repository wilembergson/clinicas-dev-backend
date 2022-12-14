import consultRepository, { ConsultInsertData } from "../repository/consultRepository.js"
import specialtyRepository from "../repository/specialtyRepository.js"
import ErrorMessage from "../utils/errorMessage.js"
import sucessMessage from "../utils/sucessMessage.js"
import getUserFromToken from "../utils/tokenInfo.js"

export type ConsultBody = {
    specialtyName:string,
    date:string
}

async function newConsult(consultData:ConsultBody, token:string){
    const { specialtyName, date } = consultData
    const user = await getUserFromToken(token)
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
        userId: user.userId,
        specialtyId:specialty.id
    }
    const existingConsult = await consultRepository.getConsult(newConsult)
    if(existingConsult) return ErrorMessage(401, 'Você já tem consulta marcada para este dia.')
    await consultRepository.newConsult(newConsult)
    return sucessMessage("Consulta marcada com sucesso.")
}

async function lisMyConsults(token:string){
    const user = await getUserFromToken(token)
    const consultList = await consultRepository.lisMyConsults(user.userId)
    return consultList
}

async function nextConsult(token:string){
    const user = await getUserFromToken(token)
    const consultList = await consultRepository.lisMyConsults(user.userId)
    const nextConsult = orderedList(consultList)
    return nextConsult
}

async function historic(token:string){
    const user = await getUserFromToken(token)
    const consultList = await consultRepository.lisMyConsults(user.userId)
    return pastConsults(consultList)
}

async function pastConsults(list:any[]){
    const now = new Date()
    const result = list.filter(item => item.date < now)
    result.sort((a,b) => Number(b.date) - Number(a.date))
    return result
}

async function orderedList(list:any[]){
    const now = new Date()
    const result = list.filter(item => item.date > now)
    result.sort((a,b) => Number(a.date) - Number(b.date))
    return result[0]
}

//Get the indices for each day of the week
async function getDaysIndex(list:any[]){
    const result:number[] = []
    const days = list.map(item => item.days.name)
    days.forEach(item => {
        switch(item){
            case 'DOMINGO':
                result.push(0)
                break
            case 'SEGUNDA':
                result.push(1)
                break
            case 'TERÇA':
                result.push(2)
                break
            case 'QUARTA':
                result.push(3)
                break
            case 'QUINTA':
                result.push(4)
                break
            case 'SEXTA':
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
    newConsult,
    lisMyConsults,
    nextConsult,
    historic
}
export default consultService
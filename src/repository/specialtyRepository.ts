import { Specialty } from "@prisma/client"
import prisma from "../config/database.js"

export type SpecialtyInsertData = Omit<Specialty, "id">

async function newSpecialty(specialty:SpecialtyInsertData){
    return await prisma.specialty.create({
        data:specialty
    })
}

async function getSpecialties(){
    return await prisma.specialty.findMany({})
}

async function getSpecialty(name:string){
    return await prisma.specialty.findUnique({
        where:{
            name
        }  
    })
}
async function getSpecialtyWithDaysAndDoctors(name:string){
    return await prisma.specialty.findFirst({
        where:{
            name
        },
        include:{
            doctor:{},
            specialtiesDays:{
                select:{
                    days:{}
                }
            }
        }
    })
}

async function getDaysAvailable(name:string){
    return await prisma.specialty.findMany({
        where:{
            name
        },
        include:{
            specialtiesDays:{
                select:{
                    days:{}
                }
            }
        }
    })
}

const specialtyRepository = {
    newSpecialty,
    getSpecialty,
    getSpecialties,
    getSpecialtyWithDaysAndDoctors,
    getDaysAvailable
}
export default specialtyRepository
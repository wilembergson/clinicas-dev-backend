import prisma from "../config/database.js"

async function getSpecialties(){
    return await prisma.specialty.findMany({})
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
    getSpecialties,
    getSpecialtyWithDaysAndDoctors,
    getDaysAvailable
}
export default specialtyRepository
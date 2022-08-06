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

const specialtyRepository = {
    getSpecialties,
    getSpecialtyWithDaysAndDoctors
}
export default specialtyRepository
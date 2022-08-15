import { faker } from "@faker-js/faker"
import prisma from "../../src/config/database"

export async function createUser(){
    const password = faker.internet.password()
    const register = {
        cpf:'111.222.333-55',
        name:faker.name.fullName(),
        birthDate: faker.date.past().toString(),
        phone:faker.phone.number('839########'),
        email:faker.internet.email(),
        password:password,
        repeatPassword:password
    }
    return register
  }

  export async function createUserWithWrongPassword(){
    const register = {
        cpf:'111.222.333-55',
        name:faker.name.fullName(),
        birthDate: faker.date.past().toString(),
        phone:faker.phone.number('839########'),
        email:faker.internet.email(),
        password:faker.internet.password(),
        repeatPassword:faker.internet.password()
    }
    return register
  }

  export async function createAddress(){
    const address = {
        number:faker.datatype.number(),
        street:faker.address.street(),
        district:faker.address.city(),
        city:faker.address.city()
      }
    return address
  }
  export async function login(email:string, password:string){
    const login = {
        email,
        password
    }
    return login
  }

  export async function deleteAll(){
    await prisma.$transaction([
        prisma.$executeRaw`TRUNCATE TABLE users CASCADE`,
        prisma.$executeRaw`TRUNCATE TABLE session CASCADE`
    ])
}
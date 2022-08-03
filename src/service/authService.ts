import bcrypt from "bcrypt"

import userRepository, { UserInsertData } from "../repository/userRepository.js"
import ErrorMessage from "../utils/errorMessage.js"
import sucessMessage from "../utils/sucessMessage.js"

export type userBody = {
    cpf:string,
    name:string,
    birthDate:string,
    phone:string,
    email:string,
    password:string,
    repeatPassword:string
}
async function newUser(userBody:userBody) {
    const { cpf, name, birthDate, phone, email, password, repeatPassword} = userBody
    const user = await userRepository.findUser(cpf)
    const userByEmail = await userRepository.findUserByEmail(email)
    if(user) return ErrorMessage(401, "Este CPF já está cadastrado.")
    if(userByEmail) return ErrorMessage(401, "Este email já está cadastrado.")
    if(password !== repeatPassword) return ErrorMessage(401, "Repita a senha corretamente.")
    
    const cryptedPassword = bcrypt.hashSync(password, 10)
    const newUser:UserInsertData = {
        cpf,
        name,
        birthDate: new Date(birthDate),
        phone,
        email,
        password: cryptedPassword,
        type:"patient",
        active:true
    }
    const result = await userRepository.newUser(newUser)
    if(!result) ErrorMessage(401, "Não foi possível registrar um novo usuário. Tente novamente.")
    return sucessMessage("Novo usuário cadastrado com sucesso.")
}

const authService = {
    newUser
}
export default authService
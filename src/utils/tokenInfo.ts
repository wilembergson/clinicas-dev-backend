import jwt from "jsonwebtoken"
import ErrorMessage from "./errorMessage.js"

type Payload = {
    userId:number,
    userName:string
}
export default async function getUserFromToken(token:string){
    if(!token) ErrorMessage(404, "Token não encontrado.")
    const dataToken: any = jwt.verify(token, process.env.JWT_SECRET)
    const user:Payload = dataToken
    return user
}
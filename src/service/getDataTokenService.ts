import getUserFromToken from "../utils/tokenInfo.js"

export async function getUserName(token:string){
    const { userName } = await getUserFromToken(token)
    return userName
}
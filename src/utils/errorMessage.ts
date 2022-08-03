export default function ErrorMessage(status:number, message: string){
    throw {status, message}
}
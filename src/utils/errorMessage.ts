export default function ErrorMessage(status:number, error: string){
    throw {status, error}
}
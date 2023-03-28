import bcrypt from 'bcrypt'
import { Hasher } from "../../../application/protocols/cryptografy/hasher";

export class BcryptAdapter implements Hasher{
    constructor(private readonly salt: number){}

    async hash(value: string): Promise<string> {
        return await bcrypt.hash(value, this.salt)
    }
    
}
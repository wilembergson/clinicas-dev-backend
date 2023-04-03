import jwt from "jsonwebtoken";
import { Decrypter, Encrypter } from "@application/protocols/cryptografy";
import { badRequest } from "@infra/http/http-helper";
import { AccessDeniedException } from "@application/exceptions";
[]
export class JwtAdapter implements Encrypter, Decrypter {
    constructor(private readonly secret: string) { }

    async encrypt(data: Encrypter.Input): Promise<string> {
        return await jwt.sign(
            data,
            this.secret,
            { expiresIn: '20s' }
        )
    }

    async decrypt(token: string): Promise<any> {
        return await jwt.verify(token, this.secret)
    }

}
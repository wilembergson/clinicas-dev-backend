import jwt from "jsonwebtoken";

export interface Decrypter {
    decrypt(token: string): Promise<any>
}
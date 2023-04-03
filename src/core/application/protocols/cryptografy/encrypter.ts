export interface Encrypter {
    encrypt(data: Encrypter.Input): Promise<string>
}

export namespace Encrypter {
    export type Input = {
        cpf: string
        name: string
    }
}
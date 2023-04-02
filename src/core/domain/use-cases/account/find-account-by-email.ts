export interface FindAccountByEmail {
    execute(email: string): Promise<FindAccountByEmail.Output>
}

export namespace FindAccountByEmail {
    export type Output = {
        cpf: string
        name: string
        birthdate: string
        phone: string
        email: string
    }
}
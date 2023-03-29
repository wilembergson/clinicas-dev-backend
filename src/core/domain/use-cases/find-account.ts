export interface FindAccount {
    execute(cpf: string): Promise<FindAccount.Output>
}

export namespace FindAccount {
    export type Output = {
        cpf: string
        name: string
        birthdate: string
        phone: string
        email: string
        password: string
    }
}
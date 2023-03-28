export interface Signup {
    execute(input: Signup.Input): Promise<Signup.Output>
}

export namespace Signup {
    export type Input = {
        cpf: string
        name: string
        birthdate: string
        phone: string
        email: string
        password: string
    }
    export type Output = {
        id: string
        cpf: string
        name: string
        birthdate: string
        phone: string
        email: string
        password: string
    }
}
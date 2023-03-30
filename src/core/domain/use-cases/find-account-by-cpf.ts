export interface FindAccountByCpf {
    execute(cpf: string): Promise<FindAccountByCpf.Output>
}

export namespace FindAccountByCpf {
    export type Output = {
        cpf: string
        name: string
        birthdate: string
        phone: string
        email: string
    }
}
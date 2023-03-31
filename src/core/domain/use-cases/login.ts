export interface Login {
    execute(input: Login.Input): Promise<string>
}

export namespace Login {
    export type Input = {
        email: string
        password: string
    }
}
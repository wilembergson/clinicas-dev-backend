export interface UpdateAddress {
    execute(input: UpdateAddress.Input): Promise<UpdateAddress.Output>
}

export namespace UpdateAddress {
    export type Input = {
        id: string
        number: string
        street: string
        district: string
        city: string
        uf: string
    }
    export type Output = {
        id: string
        number: number
        street: string
        district: string
        city: string
        uf: string
    }
}
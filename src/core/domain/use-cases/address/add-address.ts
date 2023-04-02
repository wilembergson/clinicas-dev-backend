export interface AddAddress {
    execute(input: AddAddress.Input): Promise<AddAddress.Output>
}

export namespace AddAddress {
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
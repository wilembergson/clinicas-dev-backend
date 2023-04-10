export interface GetAddressById {
    execute(id: string): Promise<GetAddressById.Output>
}

export namespace GetAddressById {
    export type Output = {
        id: string
        number: number
        street: string
        district: string
        city: string
        uf: string
    }
}
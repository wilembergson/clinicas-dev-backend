export interface AddConsult {
    execute(input:AddConsult.Input):Promise<void>
}

export namespace AddConsult {
    export type Input = {
        specialty: string
        date: string
    }
}
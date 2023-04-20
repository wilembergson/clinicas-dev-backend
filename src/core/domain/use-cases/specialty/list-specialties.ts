export interface ListSpecialties {
    execute(): Promise<ListSpecialties.Output[]>
}

export namespace ListSpecialties {
    export type Output = {
        name: string,
        days: string[]
    }
}
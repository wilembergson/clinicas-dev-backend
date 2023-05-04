import { Consult } from "@domain/entities";
import { ConsultRepository } from "@domain/repositories";
import { ConnectionDatabase } from "@infra/database/connection-database"

export class ConsultRepositoryDb implements ConsultRepository {
    constructor(
        private readonly database: ConnectionDatabase
    ) { }

    async getConsultById(id: string, accountId: string): Promise<Consult> {
        try {
            const foundConsult = await this.database.getConnection().consult.findFirst({
                where: {
                    id,
                    accountId
                },
                include: {
                    account: {
                        include: {
                            address:{}
                        }
                    },
                    specialty: {}
                }
            })
            return new Consult(foundConsult)
        } catch (error) { }
    }

    async listConsults(accountId: string): Promise<Consult[]> {
        try {
            const foundConsults = await this.database.getConnection().consult.findMany({
                where: {
                    accountId
                },
                include: {
                    specialty: {},
                }
            })
            const consults = foundConsults.map(item => new Consult(item))
            return consults
        } catch (error) { }
    }

    async getConsult(input: ConsultRepository.Input): Promise<Consult> {
        try {
            const { specialty, date, accountId } = input
            const foundConsult = await this.database.getConnection().consult.findFirst({
                where: {
                    date,
                    accountId,
                    specialty: {
                        name: specialty
                    }
                }
            })
            return new Consult(foundConsult)
        } catch (error) { }
    }

    async save(consult: Consult): Promise<Consult> {
        try {
            const { id, date, active, specialty, account } = consult.getState()
            const savedConsult = await this.database.getConnection().consult.create({
                data: {
                    id,
                    date,
                    active,
                    specialty: {
                        connectOrCreate: {
                            where: {
                                id: specialty.getState().id
                            },
                            create: {
                                id: specialty.getState().id,
                                name: specialty.getState().name
                            }
                        }
                    },
                    account: {
                        connectOrCreate: {
                            where: {
                                id: account.getState().id
                            },
                            create: account.getState()
                        }
                    }
                },
                include: {
                    specialty: true,
                    account: true
                }
            })
            const result = new Consult(savedConsult)
            return result
        } catch (error) {
        }
    }
    async update(consult: Consult): Promise<Consult> {
        try {
            const { id, active } = consult.getState()
            const savedConsult = await this.database.getConnection().consult.update({
                where: { id },
                data: {
                    active
                }
            })
            const result = new Consult(savedConsult)
            return result
        } catch (error) {
        }
    }
}
import { Consult, Day, Specialty } from "@domain/entities";
import { ConsultRepository, SpecialtyRepository } from "@domain/repositories";
import { ConnectionDatabase } from "@infra/database/connection-database"

export class ConsultRepositoryDb implements ConsultRepository {
    constructor(
        private readonly database: ConnectionDatabase
    ) { }

    async save(consult: Consult): Promise<Consult> {
        try {
            const { id, date, specialty, account } = consult.getState()
            const savedConsult = await this.database.getConnection().consult.create({
                data: {
                    id,
                    date,
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
}
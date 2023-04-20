import { Day, Specialty } from "@domain/entities";
import { SpecialtyRepository } from "@domain/repositories";
import { ConnectionDatabase } from "@infra/database/connection-database"

export class SpecialtyRepositoryDb implements SpecialtyRepository {
    constructor(
        private readonly database: ConnectionDatabase
    ) { }
    async getAll(): Promise<Specialty[]> {
        const result = await this.database.getConnection().specialty.findMany({
            include: {
                specialtiesDays: {
                    select: {
                        days: {}
                    }
                }
            }
        })
        const specialyties = result.map(item => {
            const specialty = new Specialty(item)
            const days = item.specialtiesDays.map(item => new Day(item.days))
            specialty.addDays(days)
            return specialty
        })

        return specialyties
    }

    async getByName(name: string): Promise<Specialty> {
        const result = await this.database.getConnection().specialty.findFirst({
            where: {
                name
            },
            include: {
                specialtiesDays: {
                    select: {
                        days: {}
                    }
                }
            }
        })
        const days = result.specialtiesDays.map(item => new Day(item.days))
        const specialty = new Specialty({
            id: result.id,
            name: result.name
        })
        specialty.addDays(days)
        return specialty
    }

}
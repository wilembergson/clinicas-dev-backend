import { Account } from "../../domain/entities";
import { AccountRepository } from "../../domain/repositories";
import { ConnectionDatabase } from "../database/connection-database";

export class AccountRepositoryDb implements AccountRepository {
    constructor(
        private readonly database: ConnectionDatabase
    ) { }

    async add(data: Account): Promise<Account.State> {
        return await this.database.getConnection().account.create({
            data: data.getState()
        })
    }

    async findByCpf(cpf: string): Promise<Account.State> {
        return await this.database.getConnection().account.findFirst({
            where: {
                cpf
            }
        })
    }

    async findByEmail(email: string): Promise<Account.State> {
        return await this.database.getConnection().account.findFirst({
            where: {
                email
            }
        })
    }
}
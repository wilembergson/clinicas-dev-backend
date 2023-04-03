import { Account } from "@domain/entities";

export interface LoadAccountByToken {
    execute(accessToken: string): Promise<Account>
}
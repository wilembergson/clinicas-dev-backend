import { Account } from "@domain/entities"

export interface AccountRepository{
    add(data: Account): Promise<Account.State>
    findByCpf(cpf: string): Promise<Account.State>
    findByEmail(email: string): Promise<Account.State>
    update(data: Account): Promise<Account.State>
}
import { Account } from "../entities";

export interface AccountRepository{
    add(data: Account): Promise<Account.State>
    findByCpf(cpf: string): Promise<Account.State>
    findByEmail(email: string): Promise<Account.State>
}
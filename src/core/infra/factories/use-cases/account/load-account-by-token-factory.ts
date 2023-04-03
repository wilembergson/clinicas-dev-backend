import { DbRepositoryFactory } from "@infra/factories/repositories"
import { LoadAccountByTokenUsecase } from "@application/use-cases"
import { JwtAdapter } from "@infra/cryptografy"

export function loadAccountByTokenFactory() {
    const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET)
    const repositoryFactory = new DbRepositoryFactory()
    return new LoadAccountByTokenUsecase(jwtAdapter,repositoryFactory)
}
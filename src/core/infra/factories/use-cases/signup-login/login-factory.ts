import { LoginUsecase } from "@application/use-cases"
import { BcryptAdapter, JwtAdapter } from "@infra/cryptografy"
import { DbRepositoryFactory } from "@infra/factories/repositories"

export function loginFactory() {
    const repositoryFactory = new DbRepositoryFactory()
    return new LoginUsecase(
        new BcryptAdapter(10),
        new JwtAdapter(process.env.JWT_SECRET),
        repositoryFactory
    )
}
import { LoginUsecase } from "@application/use-cases"
import { DbRepositoryFactory } from "../repositories"
import { BcryptAdapter, JwtAdapter } from "@infra/cryptografy"

export function loginFactory() {
    const repositoryFactory = new DbRepositoryFactory()
    return new LoginUsecase(
        new BcryptAdapter(10),
        new JwtAdapter(process.env.JWT_SECRET),
        repositoryFactory
    )
}
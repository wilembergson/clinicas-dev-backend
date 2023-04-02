import { SignupUsecase } from "@application/use-cases"
import { BcryptAdapter } from "@infra/cryptografy"
import { DbRepositoryFactory } from "@infra/factories/repositories"

export function signupFactory() {
    const repositoryFactory = new DbRepositoryFactory()
    return new SignupUsecase(repositoryFactory, new BcryptAdapter(10))
}
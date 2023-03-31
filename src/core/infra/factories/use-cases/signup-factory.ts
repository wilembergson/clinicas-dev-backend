import { SignupUsecase } from "@application/use-cases"
import { DbRepositoryFactory } from "../repositories"
import { BcryptAdapter } from "@infra/cryptografy"

export function signupFactory() {
    const repositoryFactory = new DbRepositoryFactory()
    return new SignupUsecase(repositoryFactory, new BcryptAdapter(10))
}
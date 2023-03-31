import { BcryptAdapter } from "@infra/cryptografy/bcrypt-adapter/bcrypt-adapter"
import { SignupUsecase } from "@application/use-cases"
import { DbRepositoryFactory } from "../repositories"

export function signupFactory() {
    const repositoryFactory = new DbRepositoryFactory()
    return new SignupUsecase(repositoryFactory, new BcryptAdapter(10))
}
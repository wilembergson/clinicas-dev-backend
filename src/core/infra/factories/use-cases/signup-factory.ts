import { SignupUsecase } from "../../../application/use-cases/signup";
import { BcryptAdapter } from "../../cryptografy/bcrypt-adapter/bcrypt-adapter";
import { DbRepositoryFactory } from "../repositories";

export function signupFactory() {
    const repositoryFactory = new DbRepositoryFactory()
    return new SignupUsecase(repositoryFactory, new BcryptAdapter(10))
}
import { Validation } from "@infra/protocols";
import { loginSchema } from "@application/schemas";
import { EmailValidatorAdapter } from "@infra/adapters";
import { findAccountByEmailFactory } from "../use-cases";
import {
    EmailFormatValidation,
    NotFoundEmailValidation,
    PasswordValidation,
    RequiredFieldValidation,
    ValidationComposite
} from "@application/validators";
import { DbRepositoryFactory } from "../repositories";
import { BcryptAdapter } from "@infra/cryptografy";

export function loginValidationFactory(): ValidationComposite {
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation(loginSchema))
    validations.push(new EmailFormatValidation(new EmailValidatorAdapter()))
    validations.push(new NotFoundEmailValidation(findAccountByEmailFactory()))
    validations.push(new PasswordValidation(new BcryptAdapter(10), new DbRepositoryFactory()))
    return new ValidationComposite(validations)
}
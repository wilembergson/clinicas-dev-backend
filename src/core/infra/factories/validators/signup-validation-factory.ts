import { Validation } from "@infra/protocols";
import { accountSchema } from "@application/schemas";
import { CpfValidatorAdapter, EmailValidatorAdapter } from "@infra/adapters";
import { findAccountByCpfFactory, findAccountByEmailFactory } from "../use-cases";
import {
    CpfFormatValidation,
    EmailFormatValidation,
    ExistentCpfValidation,
    ExistentEmailValidation,
    RequiredFieldValidation,
    ValidationComposite
} from "@application/validators";

export function signupValidationFactory(): ValidationComposite {
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation(accountSchema))
    validations.push(new CpfFormatValidation(new CpfValidatorAdapter()))
    validations.push(new ExistentCpfValidation(findAccountByCpfFactory()))
    validations.push(new EmailFormatValidation(new EmailValidatorAdapter()))
    validations.push(new ExistentEmailValidation(findAccountByEmailFactory()))
    return new ValidationComposite(validations)
}
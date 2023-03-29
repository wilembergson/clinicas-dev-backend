import { findAccountByCpfFactory, findAccountByEmailFactory } from "../use-cases";
import { CpfValidatorAdapter, EmailValidatorAdapter } from "../../adapters";
import { Validation } from "../../protocols";
import {
    CpfFormatValidation,
    EmailFormatValidation,
    ExistentCpfValidation,
    ExistentEmailValidation,
    RequiredFieldValidation,
    ValidationComposite
} from "../../../application/validators";

export function signupValidationFactory(): ValidationComposite {
    const validations: Validation[] = []
    for (const field of ['cpf', "name", "birthdate", "phone", "email", "password"]) {
        validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CpfFormatValidation(new CpfValidatorAdapter()))
    validations.push(new ExistentCpfValidation(findAccountByCpfFactory()))
    validations.push(new EmailFormatValidation(new EmailValidatorAdapter()))
    validations.push(new ExistentEmailValidation(findAccountByEmailFactory()))
    return new ValidationComposite(validations)
}
import { CpfFormatValidation, RequiredFieldValidation, ValidationComposite } from "../../../application/validators";
import { ExistentCpfValidation } from "../../../application/validators/existent-cpf-validation";
import { CpfValidatorAdapter } from "../../adapters";
import { Validation } from "../../protocols";
import { findAccountFactory } from "../use-cases";

export function signupValidationFactory(): ValidationComposite{
    const validations: Validation[] = []
    for(const field of ['cpf', "name", "birthdate", "phone", "email", "password"]){
        validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CpfFormatValidation(new CpfValidatorAdapter()))
    validations.push(new ExistentCpfValidation(findAccountFactory()))
    return new ValidationComposite(validations)
}
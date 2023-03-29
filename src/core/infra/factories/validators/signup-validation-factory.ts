import { CpfFormatValidation, RequiredFieldValidation, ValidationComposite } from "../../../application/validators";
import { CpfValidatorAdapter } from "../../adapters";
import { Validation } from "../../protocols";

export function signupValidationFactory(): ValidationComposite{
    const validations: Validation[] = []
    for(const field of ['cpf', "name", "birthdate", "phone", "email", "password"]){
        validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CpfFormatValidation(new CpfValidatorAdapter()))
    return new ValidationComposite(validations)
}
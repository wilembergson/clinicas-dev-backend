import { RequiredFieldValidation, ValidationComposite } from "../../../application/validators";
import { Validation } from "../../protocols";

export function signupValidationFactory(): ValidationComposite{
    const validations: Validation[] = []
    for(const field of ['cpf', "name", "birthdate", "phone", "email", "password"]){
        validations.push(new RequiredFieldValidation(field))
    }
    return new ValidationComposite(validations)
}
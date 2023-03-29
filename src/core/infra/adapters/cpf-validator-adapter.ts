import { CpfValidator } from "../protocols";
import cpf  from 'cpf'

const cpfRegex = /^\d{11}$/;

export class CpfValidatorAdapter implements CpfValidator {
    
    isValid(value: string): boolean {
        return (cpfRegex.test(value) && cpf.isValid(value))
    }

}
import { BaseException } from "../../../../../src/core/application/exceptions"
import { ValidationComposite } from "../../../../../src/core/application/validators"
import { HttpRequest, Validation } from "../../../../../src/core/infra/protocols"
import { generate } from "cpf"

type SutTypes = {
    sut: ValidationComposite
    validationStubs: Validation[]
}

function makeValidation(): Validation {
    class ValidationStub implements Validation {
        async validate(input: any): Promise<BaseException> {
            return new BaseException('ExempleName', 'Exemple message', 422)
        }
    }
    return new ValidationStub()
}

function makeSut(): SutTypes {
    const validationStubs = [makeValidation(), makeValidation()]
    const sut = new ValidationComposite(validationStubs)
    return {
        sut,
        validationStubs
    }
}

function generateCpf(): string {
    return generate().replace(/[-.]/g, "")
}
function makeRequestWithWrongParam(wrongParam: string): HttpRequest {
    return {
        body: {
            [wrongParam]: generateCpf()
        }
    }
}

describe('Validation Composite', () => {
    it('should not return validation succeeds', async () => {
        const { sut } = makeSut()
        const error = await sut.validate(makeRequestWithWrongParam('cpf'))
        expect(error).toBeTruthy()
    })
})
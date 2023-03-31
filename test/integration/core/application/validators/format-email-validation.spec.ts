import { generate } from "cpf";
import { faker } from "@faker-js/faker";
import { InvalidCpfException } from "@application/exceptions";
import { CpfFormatValidation } from "@application/validators";
import { CpfValidator, HttpRequest } from "@infra/protocols";
import { CpfValidatorAdapter } from "@infra/adapters";

let cpfValidator: CpfValidator
let sut: CpfFormatValidation

beforeAll(() => {
    cpfValidator = new CpfValidatorAdapter()
    sut = new CpfFormatValidation(cpfValidator)
})

function generateCpf(): string {
    return generate().replace(/[-.]/g, "")
}

function makeRequestWithBodyData(cpf: string): HttpRequest {
    return {
        body: {
            cpf
        }
    }
}

function makeRequestWithParamsData(cpf: string): HttpRequest {
    return {
        body: {},
        params: {
            cpf
        }
    }
}

describe('Existent cpf validation', () => {
    it('should validate the cpf passed by body', async () => {
        const cpf = generateCpf()
        const error = await sut.validate(makeRequestWithBodyData(cpf))
        expect(error).toBeFalsy()
    })

    it('should validate the cpf passed by params', async () => {
        const cpf = generateCpf()
        const error = await sut.validate(makeRequestWithParamsData(cpf))
        expect(error).toBeFalsy()
    })

    it('should throw with cpf passed by body', async () => {
        const cpf = faker.datatype.bigInt().toString()
        const error = await sut.validate(makeRequestWithBodyData(cpf))
        expect(error).toEqual(new InvalidCpfException())
    })

    it('should throw with cpf passed by params', async () => {
        const cpf = faker.datatype.bigInt().toString()
        const error = await sut.validate(makeRequestWithParamsData(cpf))
        expect(error).toEqual(new InvalidCpfException())
    })
})

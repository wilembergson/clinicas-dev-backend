import { InvalidEmailException } from "@application/exceptions";
import { EmailFormatValidation } from "@application/validators";
import { faker } from "@faker-js/faker";
import { EmailValidatorAdapter } from "@infra/adapters";
import { EmailValidator, HttpRequest } from "@infra/protocols";

let emailValidator: EmailValidator
let sut: EmailFormatValidation

beforeAll(() => {
    emailValidator = new EmailValidatorAdapter()
    sut = new EmailFormatValidation(emailValidator)
})

function generateEmail(): string {
    return faker.internet.email()
}

function makeRequestWithBodyData(email: string): HttpRequest {
    return {
        body: {
            email
        }
    }
}

describe('Existent email validation', () => {
    it('should validate the email passed by body', async () => {
        const email = generateEmail()
        const error = await sut.validate(makeRequestWithBodyData(email))
        expect(error).toBeFalsy()
    })

    it('should throw with email passed by body', async () => {
        const email = faker.datatype.bigInt().toString()
        const error = await sut.validate(makeRequestWithBodyData(email))
        expect(error).toEqual(new InvalidEmailException())
    })
})

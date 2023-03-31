import Joi from "joi"
import { faker } from "@faker-js/faker"
import { RequiredFieldValidation } from "@application/validators"
import { MissingParamError } from "@application/exceptions"
import { HttpRequest } from "@infra/protocols"

const schema = Joi.object({
    name:Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
})

function makeSut() {
    return new RequiredFieldValidation(schema)
}
function makeSuccessRequest(): HttpRequest {
    return {
        body: {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }
    }
}

function makeFailRequest(): HttpRequest {
    return {
        body: {
            email: faker.internet.email(),
            password: faker.internet.password()
        }
    }
}

describe('Required field validation', () => {
    it('should not return an  error if validation succeeds', async () => {
        const sut = makeSut()
        const error = await sut.validate(makeSuccessRequest())
        expect(error).toBeFalsy()
    })

    it('should return a MissingParamError if validation fails', async () => {
        const sut = makeSut()
        const error = await sut.validate(makeFailRequest())
        expect(error).toEqual(new MissingParamError(error.message))
    })
})

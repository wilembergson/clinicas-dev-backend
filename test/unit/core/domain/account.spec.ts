import { faker } from "@faker-js/faker"
import { generate } from 'cpf'
import { Account } from "../../../../src/core/domain/entities"

function makeAccount() {
    return new Account({
        id: faker.datatype.uuid(),
        cpf: generate().replace(/[-.]/g, ""),
        name: faker.name.firstName(),
        birthdate: new Date('1995-01-08').toString(),
        phone: '83976884321',
        email: faker.internet.email(),
        password: faker.internet.password()
    })
}

describe('Cpf', () => {
    it('should be possible create a instance', () => {
        const account = makeAccount()
        expect(() => account).not.toThrow()
    })

    it('should be able to get state.', () => {
        const account = makeAccount()
        expect(account.getInformations()).toHaveProperty('cpf')
        expect(account.getInformations()).toHaveProperty('name')
        expect(account.getInformations()).toHaveProperty('birthdate')
        expect(account.getInformations()).toHaveProperty('phone')
        expect(account.getInformations()).toHaveProperty('email')
    })

    it('should be able to get state without ID', () => {
        const account = makeAccount()
        expect(account.getState()).toHaveProperty('cpf')
        expect(account.getState()).toHaveProperty('name')
        expect(account.getState()).toHaveProperty('birthdate')
        expect(account.getState()).toHaveProperty('phone')
        expect(account.getState()).toHaveProperty('email')
        expect(account.getState()).toHaveProperty('password')
    })
})
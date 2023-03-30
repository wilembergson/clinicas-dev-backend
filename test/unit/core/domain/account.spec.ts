import { faker } from "@faker-js/faker"
import { generate } from 'cpf'
import { Account } from "../../../../src/core/domain/entities"

function makeAccount(){
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
        expect(account.getStateWithoutID()).toHaveProperty('cpf')
        expect(account.getStateWithoutID()).toHaveProperty('name')
        expect(account.getStateWithoutID()).toHaveProperty('birthdate')
        expect(account.getStateWithoutID()).toHaveProperty('phone')
        expect(account.getStateWithoutID()).toHaveProperty('email')
        expect(account.getStateWithoutID()).toHaveProperty('password')
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
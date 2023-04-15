import { faker } from "@faker-js/faker"
import { Account, Consult, Specialty } from "@domain/entities"
import { generate } from "cpf"

describe('Consult', () => {
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
    function makeSpecialty() {
        return new Specialty({
            name: faker.datatype.string()
        })
    }
    function makeConsult() {
        return new Consult({
            date: faker.datatype.datetime().toDateString()
        })
    }
    it('should be possible create a instance', () => {
        const consult = makeConsult()
        expect(() => consult).not.toThrow()
    })

    it('should be able to get state.', () => {
        const consult = makeConsult()
        expect(consult.getState()).toHaveProperty('id')
        expect(consult.getState()).toHaveProperty('date')
        expect(consult.getState()).toHaveProperty('specialty')
        expect(consult.getState()).toHaveProperty('account')
    })
    it('should update account and specialty.', () => {
        const consult = makeConsult()
        const account = makeAccount()
        const specialty = makeSpecialty()
        consult.addAccount(account)
        consult.addSpecialty(specialty)
        expect(consult.getState().account).toStrictEqual(account)
        expect(consult.getState().specialty).toStrictEqual(specialty)
    })
})
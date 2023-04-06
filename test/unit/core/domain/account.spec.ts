import { faker } from "@faker-js/faker"
import { generate } from 'cpf'
import { Account, Address } from "@domain/entities"

describe('Account', () => {
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
    function makeAddress() {
        return new Address({
            number: faker.address.buildingNumber(),
            street: faker.address.street(),
            district: faker.address.street(),
            city: faker.address.city(),
            uf: 'PB'
        })
    }
    
    it('should be possible create a instance', () => {
        const account = makeAccount()
        expect(() => account).not.toThrow()
    })

    it('should update the address linked to the account', () => {
        const account = makeAccount()
        const address = makeAddress()
        account.updateAddress(address)
        expect(account.getState().addressId).not.toBeNull()
        expect(account.getAddress()).toEqual(address)
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
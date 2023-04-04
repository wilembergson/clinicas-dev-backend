import { faker } from "@faker-js/faker"
import { Address } from "@domain/entities"

function makeAddress(){
    return new Address({
        number: faker.address.buildingNumber(),
        street: faker.address.street(),
        district: faker.address.street(),
        city: faker.address.city(),
        uf: 'PB'
    })
}
describe('Address', () => {
    it('should be possible create a instance', () => {
        const address = makeAddress()
        expect(() => address).not.toThrow()
    })

    it('should be able to get state.', () => {
        const address = makeAddress()
        expect(address.getState()).toHaveProperty('number')
        expect(address.getState()).toHaveProperty('street')
        expect(address.getState()).toHaveProperty('district')
        expect(address.getState()).toHaveProperty('city')
        expect(address.getState()).toHaveProperty('uf')
    })
    it('should be able to get state with string types.', () => {
        const address = makeAddress()
        expect(address.getStateString()).toHaveProperty('number')
        expect(address.getStateString()).toHaveProperty('street')
        expect(address.getStateString()).toHaveProperty('district')
        expect(address.getStateString()).toHaveProperty('city')
        expect(address.getStateString()).toHaveProperty('uf')
        expect(typeof address.getStateString().number).toEqual('string')
    })
})
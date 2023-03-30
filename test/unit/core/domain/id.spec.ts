import { faker } from "@faker-js/faker"
import { ID } from "../../../../src/core/domain/entities"

describe('ID', () => {
    it('should be possible create a instance.', () => {
        expect(() => new ID()).not.toThrow()
    })

    it('should throws if invalid value is provided.', () => {
        const value = 'invalid_uuid'
        expect(() => new ID(value)).toThrow()
    })

    it('should not throws if valid value is provided.', () => {
        const value = faker.datatype.uuid()
        expect(() => new ID(value)).not.toThrow()
    })
    
    it('should be able to get value.', () => {
        expect(() => new ID().value).not.toThrow()
    })
})
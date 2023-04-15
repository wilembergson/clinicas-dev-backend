import { faker } from "@faker-js/faker"
import { Day, Specialty } from "@domain/entities"

describe('Specialty', () => {
    function makeSpecialty() {
        return new Specialty({
            name: faker.datatype.string()
        })
    }

    function makeDay(name: string) {
        return new Day({
            name
        })
    }

    it('should be possible create a instance', () => {
        const specialty = makeSpecialty()
        expect(() => specialty).not.toThrow()
    })

    it('should be able to get state.', () => {
        const specialty = makeSpecialty()
        expect(specialty.getState()).toHaveProperty('id')
        expect(specialty.getState()).toHaveProperty('name')
        expect(specialty.getState()).toHaveProperty('days')
    })
    it('should update days property', () => {
        const specialty = makeSpecialty()
        const days = [
            makeDay('SEGUNDA'),
            makeDay('TERÇA'),
            makeDay('QUARTA')
        ]
        const daysWeekNumber = days.map(item => item.getDayNumber())
        specialty.addDays(days)
        expect(specialty.getState().days).toStrictEqual(days)
        expect(specialty.getAvailableDays()).toStrictEqual(daysWeekNumber)
    })
})
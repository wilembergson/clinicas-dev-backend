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
        const segunda = makeDay('SEGUNDA')
        const terca = makeDay('TERÇA')
        const quarta = makeDay('QUARTA')
        const days = [segunda, terca, quarta]
        const daysWeekNumber = days.map(item => item.getDayNumber())
        const daysName = days.map(item => item.getState().name)
        specialty.addDays(days)
        expect(specialty.getAvailableNameDays()).toStrictEqual(daysName)
        expect(specialty.getAvailableDays()).toStrictEqual(daysWeekNumber)
    })
})
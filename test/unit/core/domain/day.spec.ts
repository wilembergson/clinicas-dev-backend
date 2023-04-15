import { faker } from "@faker-js/faker"
import { Day, Specialty } from "@domain/entities"

describe('Day', () => {
    function makeDay(name: string) {
        return new Day({
            name
        })
    }

    it('should be possible create a instance', () => {
        const day = makeDay('SEGUNDA')
        expect(() => day).not.toThrow()
    })

    it('should be able to get state.', () => {
        const day = makeDay('SEGUNDA')
        expect(day.getState()).toHaveProperty('id')
        expect(day.getState()).toHaveProperty('name')
    })
    it('should get equivalent number day', () => {
        const day = [
            'DOMINGO',
            'SEGUNDA',
            'TERÇA',
            'QUARTA',
            'QUINTA',
            'SEXTA',
            'SÁBADO',
        ]
        expect((makeDay(day[0])).getDayNumber()).toStrictEqual(0)
        expect((makeDay(day[1])).getDayNumber()).toStrictEqual(1)
        expect((makeDay(day[2])).getDayNumber()).toStrictEqual(2)
        expect((makeDay(day[3])).getDayNumber()).toStrictEqual(3)
        expect((makeDay(day[4])).getDayNumber()).toStrictEqual(4)
        expect((makeDay(day[5])).getDayNumber()).toStrictEqual(5)
        expect((makeDay(day[6])).getDayNumber()).toStrictEqual(6)
        expect((makeDay(day[7])).getDayNumber()).toStrictEqual(null)
    })
})
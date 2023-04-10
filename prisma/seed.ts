import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const days = [
        {
            id: faker.datatype.uuid(),
            name: 'SEGUNDA'
        },
        {
            id: faker.datatype.uuid(),
            name: 'TERÇA'
        },
        {
            id: faker.datatype.uuid(),
            name: 'QUARTA'
        },
        {
            id: faker.datatype.uuid(),
            name: 'QUINTA'
        },
        {
            id: faker.datatype.uuid(),
            name: 'SEXTA'
        },
        {
            id: faker.datatype.uuid(),
            name: 'SÁBADO'
        },
        {
            id: faker.datatype.uuid(),
            name: 'DOMINGO'
        },
    ];
    for (let day of days) {
        await prisma.days.create({
            data: day
        });
    }

    const specialties = [
        {
            id: faker.datatype.uuid(),
            name: 'ORTOPEDIA'
        },
        {
            id: faker.datatype.uuid(),
            name: 'CARDIOLOGIA'
        },
        {
            id: faker.datatype.uuid(),
            name: 'PEDIATRIA'
        },
        {
            id: faker.datatype.uuid(),
            name: 'HEMATOLOGIA'
        }
    ];
    for (const specialty of specialties) {
        await prisma.specialty.create({
            data: specialty
        });
    }

    const specialties_days = [
        {
            id: faker.datatype.uuid(),
            specialtyId: specialties[0].id,
            daysId: days[0].id
        },
        {
            id: faker.datatype.uuid(),
            specialtyId: specialties[0].id,
            daysId: days[1].id
        },
        {
            id: faker.datatype.uuid(),
            specialtyId: specialties[0].id,
            daysId: days[4].id
        },
        {
            id: faker.datatype.uuid(),
            specialtyId: specialties[1].id,
            daysId: days[1].id
        },
        {
            id: faker.datatype.uuid(),
            specialtyId: specialties[1].id,
            daysId: days[2].id
        },
        {
            id: faker.datatype.uuid(),
            specialtyId: specialties[2].id,
            daysId: days[0].id
        },
        {
            id: faker.datatype.uuid(),
            specialtyId: specialties[2].id,
            daysId: days[3].id
        },
        {
            id: faker.datatype.uuid(),
            specialtyId: specialties[2].id,
            daysId: days[4].id
        },
        {
            id: faker.datatype.uuid(),
            specialtyId: specialties[3].id,
            daysId: days[2].id
        },
        {
            id: faker.datatype.uuid(),
            specialtyId: specialties[3].id,
            daysId: days[3].id
        },
    ];
    for (const specialty_day of specialties_days) {
        await prisma.specialtiesDays.create({
            data: specialty_day
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
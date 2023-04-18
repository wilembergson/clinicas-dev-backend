import { PrismaClient } from '@prisma/client';
import { Database } from './databese';

export class ConnectionDatabase implements Database<PrismaClient>{
    private client: PrismaClient

    constructor() {
        this.client = new PrismaClient()
    }

    getConnection() {
        return this.client
    }

    async clearStorage(table: string): Promise<void> {
        const keys = this.client.$executeRaw`TRUNCATE TABLE "${table}" CASCADE`
    }

    async close(): Promise<void> {
        await this.client.$disconnect()
    }
}
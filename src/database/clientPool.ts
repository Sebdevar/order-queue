import { Pool } from 'pg';
import config from '../configuration/config'

class DatabaseClientPool {
    private pool: Pool;
    private static instance: DatabaseClientPool;

    private constructor() {
        this.pool = new Pool({
            host: config.database.host,
            port: config.database.port,
            user: config.database.username,
            password: config.database.password,
            database: config.database.databaseName,
        })
    }

    public static getInstance(): DatabaseClientPool {
        if (!DatabaseClientPool.instance) {
            DatabaseClientPool.instance = new DatabaseClientPool();
        }
        return DatabaseClientPool.instance;
    }

    async query(text: string, params?: any[]) {
        try {
            return this.pool.query(text, params);
        } catch (error) {
            throw error;
        }
    }

    async getClient() {
        return await this.pool.connect()
    }

    async close() {
        await this.pool.end();
    }
}

export default DatabaseClientPool.getInstance();
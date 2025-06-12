import db from 'database/clientPool';
import { loadSqlSchema } from './sqlLoader';

export const setupDatabase = async () => {
    try {
        await db.query(loadSqlSchema('type__order_status.sql'));
        await db.query(loadSqlSchema('table__orders.sql'));
    } catch (error) {
        throw error;
    }
}
import db from 'database/clientPool'
import { loadSqlQuery } from './sqlLoader';

class OrderRepository {
    async createOrder(data: any, receivedAt: Date) {
        try {
            const result = await db.query(loadSqlQuery('createNewOrders.sql'), [data, receivedAt]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }
}
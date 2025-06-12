import { Order, OrderStatus } from '../models/orders';
import db from './clientPool'
import { loadSqlQuery } from './sqlLoader';

class OrderRepository {
    async createOrder(data: any): Promise<Order> {
        try {
            const result = await db.query(loadSqlQuery('createNewOrders.sql'), [data]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getOrderById(orderId: number): Promise<Order> {
        try {
            const result = await db.query(loadSqlQuery('getOrderById.sql'), [orderId]);
            return result.rows[0]
        } catch (error) {
            throw error;
        }
    }

    async updateOrderStatus(orderId: number, status: OrderStatus): Promise<Order> {
        try {
            const result = await db.query(loadSqlQuery('updateOrderById.sql'), [orderId, status]);
            return result.rows[0]
        } catch (error) {
            throw error;
        }
    }
}

export default OrderRepository;
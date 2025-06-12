import { Order, OrderStatus } from '../models/orders';
import db from './clientPool';

class OrderRepository {
    async createOrder(data: any): Promise<Order> {
        try {
            const result = await db.query("INSERT INTO orders (data) VALUES($1) RETURNING *", [data]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getOrderById(orderId: number): Promise<Order> {
        try {
            const result = await db.query("SELECT * FROM orders WHERE id = $1", [orderId]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async updateOrderStatus(orderId: number, status: OrderStatus): Promise<Order> {
        try {
            const result = await db.query("UPDATE orders SET status = $2 WHERE id = $1 RETURNING *", [orderId, status]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

export default OrderRepository;
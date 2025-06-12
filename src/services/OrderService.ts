import OrderRepository from 'database/orderRepository';
import { Order, OrderStatus } from 'models/orders';

class OrderService {
    private orderRepository: OrderRepository;

    constructor(orderRepository: OrderRepository) {
        this.orderRepository = orderRepository;
    }

    async createOrder(data: Order): Promise<Order> {
        return await this.orderRepository.createOrder(data)
    }

    async processOrder(orderId: number): Promise<Order> {
        const order = await this.orderRepository.getOrderById(orderId);
        if (!order) { throw new Error(`${orderId} not found`); }
        try {
            await this.orderRepository.updateOrderStatus(orderId, OrderStatus.PROCESSING)

            // TODO: Add processing logic here

            return await this.orderRepository.updateOrderStatus(orderId, OrderStatus.COMPLETED)
        } catch (error) {
            throw new Error(`failed to update or process order ${orderId}`);
        }
    }
}

export default OrderService;
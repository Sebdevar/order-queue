import OrderRepository from 'database/orderRepository';
import { Order, OrderStatus } from 'models/orders';
import NotificationService from './NotificationService';

class OrderService {
    private orderRepository: OrderRepository;
    private notificationService: NotificationService;

    constructor(orderRepository: OrderRepository, notificationService: NotificationService) {
        this.orderRepository = orderRepository;
        this.notificationService = notificationService;
    }

    async createOrder(data: Order): Promise<Order> {
        return await this.orderRepository.createOrder(data)
    }

    async processOrder(orderId: number) {
        const order = await this.orderRepository.getOrderById(orderId);
        if (!order) { throw new Error(`${orderId} not found`); }
        try {
            await this.orderRepository.updateOrderStatus(orderId, OrderStatus.PROCESSING)

            // TODO: Add processing logic here

            await this.orderRepository.updateOrderStatus(orderId, OrderStatus.COMPLETED)
            await this.notificationService.notifyOrderProcessed(order)
        } catch (error) {
            throw new Error(`failed to update or process order ${orderId}`);
        }
    }
}

export default OrderService;
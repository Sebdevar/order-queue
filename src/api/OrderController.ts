import { Request, Response, Router } from 'express';
import OrderService from '../services/OrderService';
import RabbitMQService from '../services/RabbitMQService';

class OrderController {
    private orderService: OrderService;
    private rabbitMQService: RabbitMQService;
    private readonly router: Router;

    constructor(orderService: OrderService, rabbitMQService: RabbitMQService) {
        this.orderService = orderService;
        this.rabbitMQService = rabbitMQService;
        this.router = Router();
        this.setRoutes();
    }

    getRouter() {
        return this.router;
    }

    private async createOrder(request: Request, response: Response) {
        try {
            const orderData = request.body;
            const order = await this.orderService.createOrder(orderData);
            await this.rabbitMQService.publishOrder(order);
            response.status(201).json({
                message: 'Order created and queued for processing',
                orderId: order.id
            }).send();
        } catch (error) {
            response.status(500).json({error: 'Failed to create order'}).send();
        }
    }

    private setRoutes() {
        this.router.post('/', (request, response) =>
            this.createOrder(request, response));
    }
}

export default OrderController;
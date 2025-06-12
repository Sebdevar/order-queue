import config from 'configuration/config';
import OrderRepository from 'database/orderRepository';
import setupDatabase from 'database/setup';
import db from 'database/clientPool';
import express from "express";
import * as process from 'node:process';
import RabbitMQService from 'services/RabbitMQService';
import OrderService from 'services/OrderService';
import OrderController from 'api/OrderController';
import NotificationService from './services/NotificationService';

async function bootstrap() {
    try {
        await setupDatabase(); //TODO: move to dockerfile

        const rabbitMQService = new RabbitMQService(
            config.rabbitmq.url,
            config.rabbitmq.queueName
        );

        await rabbitMQService.connect();

        const orderRepository = new OrderRepository();
        const notificationService = new NotificationService(config.notification.url);
        const orderService = new OrderService(orderRepository, notificationService);

        const app = express();
        app.use(express.json());

        const orderController = new OrderController(orderService, rabbitMQService);
        app.use('/api/orders', orderController.getRouter());

        rabbitMQService.consumeOrders(async (order) => {
            await orderService.processOrder(order.id);
        });

        const server = app.listen(config.port)

        const shutdown = async () => {
            server.close();
            await rabbitMQService.close();
            await db.close();
        }

        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);
    } catch (error) {
        process.exit(1)
    }
}

bootstrap();
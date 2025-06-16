import amqp, { Channel, ChannelModel } from 'amqplib';
import { Order } from '../models/orders';

class RabbitMQService {
    private connection: ChannelModel | null = null;
    private channel: Channel | null = null;
    private readonly url: string;
    private readonly queueName: string;

    constructor(url: string, queueName: string) {
        this.url = url;
        this.queueName = queueName;
    }

    async connect(): Promise<void> {
        try {
            this.connection = await amqp.connect(this.url);
            this.channel = await this.connection.createChannel();

            await this.channel.assertQueue(this.queueName, {
                durable: true
            });

        } catch (error) {
            throw error;
        }
    }

    async publishOrder(orderData: any): Promise<boolean> {
        if (!this.channel) {
            throw new Error('RabbitMQ channel is not established');
        }

        try {
            const message = Buffer.from(JSON.stringify(orderData));
            return this.channel.sendToQueue(this.queueName, message, {
                persistent: true
            });
        } catch (error) {
            throw error;
        }
    }

    async consumeOrders(callback: (order: Order) => Promise<void>): Promise<void> {
        if (!this.channel) {
            throw new Error('RabbitMQ channel is not established');
        }

        try {
            await this.channel.consume(this.queueName, async (message: any) => {
                if (message) {
                    const orderData = JSON.parse(message.content.toString());
                    try {
                        callback(orderData);
                        this.channel?.ack(message);
                    } catch (error) {
                        this.channel?.nack(message, false, true);
                    }
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async close(): Promise<void> {
        try {
            if (this.channel) {
                await this.channel.close();
            }
            if (this.connection) {
                await this.connection.close();
            }
        } catch (error) {
            throw error;
        }
    }
}

export default RabbitMQService;
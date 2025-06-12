import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export default {
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432', 10),
        username: process.env.DB_USERNAME || 'dbUser',
        password: process.env.DB_PASSWORD || '12345',
        databaseName: process.env.DB_NAME || 'orders'
    },
    notification: {
        url: process.env.NOTIFICATION_URL || 'http://localhost:4000/notifications',
    },
    port: parseInt(process.env.PORT || '3000', 10),
    rabbitmq: {
        url: process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672',
        queueName: process.env.RABBITMQ_QUEUE || 'order_queue',
    },
};
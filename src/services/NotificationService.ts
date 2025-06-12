import { Order } from '../models/orders';

class NotificationService {
    private readonly notificationUrl: string;

    constructor(notificationUrl: string) {
        this.notificationUrl = notificationUrl;
    }

    async notifyOrderProcessed(order: Order): Promise<void> {
        try {
            const response = await fetch(this.notificationUrl, {
                method: 'POST',
                body: JSON.stringify(order),
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            });
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
        } catch (error) {
            throw error;
        }
    }
}

export default NotificationService;
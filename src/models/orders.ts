export enum OrderStatus {
    RECEIVED = 'received',
    PROCESSING = 'processing',
    COMPLETED = 'completed'
}

export interface Order {
    id: number;
    data: any;
    status: OrderStatus;

    received_at?: Date;
    completed_at?: Date;
    notification_sent?: boolean;
}
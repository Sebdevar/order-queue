export enum OrderStatus {
    RECEIVED = 'received',
    PROCESSING = 'processing',
    PROCESSED = 'processed'
}

export interface Order {
    id: number;
    data: any;
    status: OrderStatus;

    received_at?: Date;
    processed_at?: Date;
    notification_sent?: boolean;
}
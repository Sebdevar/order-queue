export enum OrderStatus {
    RECEIVED = 'received',
    PROCESSING = 'processing',
    COMPLETED = 'completed'
}

export interface Order {
    id: number;
    data: any;
    status: OrderStatus;
}
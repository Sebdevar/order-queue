CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    data JSONB NOT NULL,
    status ORDER_STATUS NOT NULL DEFAULT 'received',
    received_at TIMESTAMP NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMP,
    notification_sent BOOLEAN DEFAULT false
)
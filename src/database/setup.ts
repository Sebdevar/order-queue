// TODO: move into dockerfile and/or postgres docker initialization parameters. See https://hub.docker.com/_/postgres#:~:text=and%20POSTGRES_DB.-,Initialization%20scripts,-If%20you%20would
import db from '../database/clientPool';

const setupDatabase = async () => {
    try {
        await db.query(`
        DO $$ 
        BEGIN         
            IF NOT EXISTS(SELECT 1 FROM pg_type WHERE typname = 'order_status') THEN
                CREATE TYPE order_status AS ENUM ('received', 'processing', 'completed');
            END IF; 
        END $$;`);
        await db.query("CREATE TABLE IF NOT EXISTS orders (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), data JSONB NOT NULL, status ORDER_STATUS NOT NULL DEFAULT 'received')");
    } catch (error) {
        throw error;
    }
}

export default setupDatabase;
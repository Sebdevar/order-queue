// TODO: move into dockerfile and/or postgres docker initialization parameters. See https://hub.docker.com/_/postgres#:~:text=and%20POSTGRES_DB.-,Initialization%20scripts,-If%20you%20would
import db from 'database/clientPool';
import { loadSqlSchema } from './sqlLoader';

export const setupDatabase = async () => {
    try {
        await db.query(loadSqlSchema('type__order_status.sql'));
        await db.query(loadSqlSchema('table__orders.sql'));
    } catch (error) {
        throw error;
    }
}
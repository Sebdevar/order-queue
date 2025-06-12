// TODO: figure out a way to make use of SQL files in build, or switch to an ORM.
import path from 'path';
import fs from 'fs';

const SQL_SCHEMAS_LOCATION = path.resolve(__dirname, 'sql/schema/');
const SQL_QUERIES_LOCATION = path.resolve(__dirname, 'sql/queries/');

const loadSql = (filepath: string) => fs.readFileSync(filepath, 'utf8');

const loadSqlQuery = (fileName: string) => {
    const fullPath = SQL_QUERIES_LOCATION + fileName;
    return loadSql(fullPath);
}

const loadSqlSchema = (fileName: string) => {
    const fullPath = SQL_SCHEMAS_LOCATION + fileName;
    return loadSql(fullPath);
}

export {
    loadSqlQuery,
    loadSqlSchema,
}

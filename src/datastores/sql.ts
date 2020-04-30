import mysql from 'mysql';
import { CONFIG } from '../config';

export const sqlConnection = mysql.createConnection({
    host: CONFIG.db_host,
    user: CONFIG.db_user,
    password: CONFIG.db_password,
    database: CONFIG.db_name
});

export const sqlpool = mysql.createPool({
    connectionLimit: 10,
    host: CONFIG.db_host,
    user: CONFIG.db_user,
    password: CONFIG.db_password,
    database: CONFIG.db_name
});

export const qurey = (sql: string, values?: Array<any> | Object) => {
    return new Promise((resolve, reject) => {
        sqlpool.query(sql, values, (error, results, fields) => {
            console.log(fields);
            if (error) reject(error);
            resolve(results);
        });
    });
};

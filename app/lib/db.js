import dotenv from 'dotenv';
import sql from 'mssql';

dotenv.config();

const config = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    server: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    port: parseInt(process.env.DATABASE_PORT || '1433'),
    options: {
        encrypt: true,
        trustServerCertificate: false,
    }
};

let poolPromise;

// return result

export async function query(queries, values = []) {
    try {
        if (!poolPromise) {
            const pool = new sql.ConnectionPool(config);
            poolPromise = pool.connect();
        }
        const conn = await poolPromise;
        const request = conn.request();
        values.forEach((val, idx) => {
            request.input(`param${idx}`, val);
        });
        const result = await request.query(queries);
        return result.recordset;
    } catch (err) {
        console.error("SQL ERROR:", err);
        return null;
    }
}


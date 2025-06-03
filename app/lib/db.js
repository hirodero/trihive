// db.js
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const config = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: parseInt(process.env.DATABASE_PORT || '3306'),
};

let connection = null;

export async function query(sql, values = []) {
  try {
    if (!connection) {
      connection = await mysql.createConnection(config);
      console.log('✅ Connected to MySQL');
    }

    const [rows] = await connection.execute(sql, values);
    return rows;
  } catch (err) {
    console.error('❌ MySQL Error:', err);
    return null;
  }
}

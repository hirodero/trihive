import mysql from 'mysql2/promise'
let connection;
export async function query (queries, value = []){
    if(!connection){
        connection = await mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME
        })
    }
    try{
        const [data] = await connection.execute(queries,value);
        return data;
    }
    catch(err){
        console.log(err)
    }
}

import knex from 'knex'
import * as dotenv from 'dotenv'
dotenv.config()

export default knex({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    },
})

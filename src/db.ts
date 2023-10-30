import "reflect-metadata"
import { DataSource } from "typeorm"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    // port: parseInt(process.env.DB_PORT!),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "tattoo-studio-db",
    entities: [],
    migrations: [],
    synchronize: false,
    logging: false,
})

console.log(typeof process.env.DB_HOST);
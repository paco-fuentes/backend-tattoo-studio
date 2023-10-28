import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "12345678",
    database: "tattoo-studio-db",
    entities: [],
    migrations: [],
    synchronize: false,
    logging: false,
})
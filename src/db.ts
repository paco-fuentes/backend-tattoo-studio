import "reflect-metadata"
import { DataSource } from "typeorm"
import { User1698502319949 } from "./migration/1698502319949-user"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "12345678",
    database: "tattoo-studio-db",
    entities: [User1698502319949],
    migrations: [User1698502319949],
    synchronize: false,
    logging: false,
})
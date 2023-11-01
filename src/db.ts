import "reflect-metadata"
import 'dotenv/config'
import { DataSource } from "typeorm"
import { CreateTableTattooStudioUsers1698858196746 } from "./migration/1698858196746-create-table-tattoo-studio-users"
import { User } from "./models/User"



export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    // port: 3306,
    // port: parseInt(process.env.DB_PORT!),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User],
    migrations: [
        CreateTableTattooStudioUsers1698858196746
    ],
    synchronize: false,
    logging: false,
})

// console.log(typeof process.env.DB_HOST); // devuelve string
import "reflect-metadata"
import 'dotenv/config'
import { DataSource } from "typeorm"
import { CreateTableTattooStudioUsers1698858196746 } from "./migration/1698858196746-create-table-tattoo-studio-users"
import { User } from "./models/User"
import { CreateTableTattooStudioStaff1699093601736 } from "./migration/1699093601736-create-table-tattoo-studio-staff"
import { Staff } from "./models/Staff"
import { CreateTableTattooStudioProducts1699098448825 } from "./migration/1699098448825-create-table-tattoo-studio-products"
import { CreateTableTattooStudioAppointment1699098376053 } from "./migration/1699098376053-create-table-tattoo-studio-appointment"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Staff],
    migrations: [
        CreateTableTattooStudioUsers1698858196746,
        CreateTableTattooStudioStaff1699093601736,
        CreateTableTattooStudioProducts1699098448825,
        CreateTableTattooStudioAppointment1699098376053
    ],
    synchronize: false,
    logging: false,
})
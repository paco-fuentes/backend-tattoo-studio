import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableTattooStudioAppointment1699098376053 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "appointments",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "user_id",
                        type: "int",
                    },
                    {
                        name: "tattoo_artist_id",
                        type: "int",
                    },
                    {
                        name: "tattoo_id",
                        type: "int",
                    },
                    {
                        name: "observations",
                        type: "varchar",
                        length: "255",
                        isNullable: true
                    },
                    {
                        name: "date",
                        type: "varchar",
                        length: "12",
                    },
                    {
                        name: "appointment_time",
                        type: "enum",
                        enum: ["morning", "afternoon"],
                        default: '"morning"'
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP"
                    },
                    {
                        name: "is_active",
                        type: "boolean",
                        default: true
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["user_id"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                    {
                        columnNames: ["tattoo_artist_id"],
                        referencedTableName: "staff",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                    {
                        columnNames: ["tattoo_id"],
                        referencedTableName: "products",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("appointments");
    }

}

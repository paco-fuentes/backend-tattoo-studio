import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableTattooStudioProducts1699098448825 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "products",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "tattoo_artist_id",
                        type: "int",
                    },
                    {
                        name: "product_type",
                        type: "enum",
                        enum: ["tattoo", "piercing"],
                        default: '"tattoo"'
                    },
                    {
                        name: "title",
                        type: "varchar",
                        length: "50",
                    },
                    {
                        name: "description",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "time_amount",
                        type: "enum",
                        enum: ["one_session", "two_sessions"],
                        default: '"one_session"'
                    },
                    {
                        name: "price",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                        isNullable: true,
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
                ],
                foreignKeys: [
                    {
                        columnNames: ["tattoo_artist_id"],
                        referencedTableName: "staff",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products");
    }

}

import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableTattoArtists1698571447397 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tattoo_artists",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "username",
                        type: "varchar",
                        length: "50"
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "100",
                        isUnique: true
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "200"
                    },
                    {
                        name: "is_active",
                        type: "boolean",
                        default: true
                    },
                    {
                        name: "role",
                        type: "enum",
                        enum: ["user", "worker", "admin", "super_admin"],
                        default: '"worker"'
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
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tattoo_artists");
    }

}

import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Appointment } from "./Appointment"
import { Product } from "./Product"

@Entity("staff")
export class Staff extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    firstname!: string

    @Column()
    lastname!: string

    @Column()
    email!: string

    @Column()
    password!: string

    @Column()
    phone!: number

    @Column()
    adress!: string

    @Column()
    is_active!: boolean

    @Column()
    role!: string

    @Column()
    created_at!: Date

    @Column()
    updated_at!: Date

    @OneToMany(() => Product, (product) => product.tattooArtist)
    products!: Product[];

    @OneToMany(() => Appointment, (appointment) => appointment.tattooArtist)
    appointments!: Appointment[];
}

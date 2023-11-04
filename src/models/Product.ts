import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Timestamp, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { Appointment } from "./Appointment"
import { Staff } from "./Staff"

@Entity("products")
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    tattoo_artist_id!: number

    @Column()
    product_type!: string

    @Column()
    title!: string

    @Column()
    description!: string

    @Column()
    time_amount!: string

    @Column()
    price!: number

    @Column()
    created_at!: Timestamp

    @Column()
    updated_at!: Timestamp

    @ManyToOne(() => Staff, (staff) => staff.products)
    @JoinColumn({ name: 'tattoo_artist_id' })
    tattooArtist!: Staff;

    @OneToMany(() => Appointment, (appointment) => appointment.tattoo)
    appointments!: Appointment[];
}

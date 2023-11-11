import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm"
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
    img_url!: string

    @Column()
    time_amount!: string

    @Column()
    price!: number

    @Column()
    created_at!: Date

    @Column()
    updated_at!: Date

    @ManyToOne(() => Staff, (staff) => staff.products)
    @JoinColumn({ name: 'tattoo_artist_id' })
    tattooArtist!: Staff;

    @OneToMany(() => Appointment, (appointment) => appointment.tattoo)
    appointments!: Appointment[];
}

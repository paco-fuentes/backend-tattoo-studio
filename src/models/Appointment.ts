import { BaseEntity, Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"
import { Staff } from "./Staff"
import { Product } from "./Product"

@Entity("appointments")
export class Appointment extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    user_id!: number

    @Column()
    tattoo_artist_id!: number

    @Column()
    tattoo_id!: number

    @Column()
    observations!: string

    @Column()
    date!: Date
    
    @Column()
    appointment_time!: string

    @Column()
    created_at!: Date

    @Column()
    updated_at!: Date

    @Column()
    is_active!: boolean

    @ManyToOne(() => User, (user) => user.appointments)
    @JoinColumn({ name: 'user_id' })
    user!: User;
  
    @ManyToOne(() => Staff, (staff) => staff.appointments)
    @JoinColumn({ name: 'tattoo_artist_id' })
    tattooArtist!: Staff;
  
    @ManyToOne(() => Product, (product) => product.appointments)
    @JoinColumn({ name: 'tattoo_id' })
    tattoo!: Product;

}

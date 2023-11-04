import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Appointment } from "./Appointment"

@Entity("users")
export class User extends BaseEntity {

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

    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments!: Appointment[];

}

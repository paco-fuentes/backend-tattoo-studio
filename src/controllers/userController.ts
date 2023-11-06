import { Response, Request } from "express";
import 'dotenv/config'
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { Appointment } from "../models/Appointment";
import { Product } from "../models/Product";
import { Staff } from "../models/Staff";
const dayjs = require("dayjs");


const register = async (req: Request, res: Response) => {
    try {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const password = req.body.password;
        const phone = req.body.phone;
        const adress = req.body.adress;

        const encryptedPassword = bcrypt.hashSync(password, 10);

        const newUser = await User.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: encryptedPassword,
            phone: phone,
            adress: adress
        }).save();

        return res.json({
            success: true,
            message: "User created succesfully",
            token: newUser
        });

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "user can't be created",
                error: error,
            }
        )
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const email = req.body.email
        const password = req.body.password

        const user = await User.findOneBy(
            {
                email: email
            }
        )

        if (!user) {
            return res.status(400).json(
                {
                    success: true,
                    message: 'User incorrect',
                }
            )
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json(
                {
                    success: true,
                    message: 'Password incorrect',
                }
            )
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
                email: user.email
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "3h",
            }
        );

        return res.json(
            {
                success: true,
                message: "User logged succesfully",
                token: token
            }
        )

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "users cant be logged",
                error: error
            }
        )
    }
}

const profile = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneBy(
            {
                id: req.token.id
            }
        );
        return res.json(
            {
                success: true,
                message: "profile user retrieved",
                data: user
                // data: user?.email
            });
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "user can't get profile",
                error: error
            }
        );
    }
}

const updateProfile = async (req: Request, res: Response) => {
    try {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const password = req.body.password;
        const phone = req.body.phone;
        const adress = req.body.adress;

        const user = await User.findOneBy({ id: req.token.id });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (firstname) {
            user.firstname = firstname;
        }
        if (lastname) {
            user.lastname = lastname;
        }
        if (email) {
            user.email = email;
        }
        if (password) {
            const encryptedPassword = bcrypt.hashSync(password, 10);
            user.password = encryptedPassword;
        }
        if (phone) {
            user.phone = phone;
        }
        if (adress) {
            user.adress = adress;
        }

        const updatedUser = await user.save();

        return res.json({
            success: true,
            message: "User profile updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User profile update failed",
            error: error,
        });
    }
}

const createAppointment = async (req: Request, res: Response) => {
    try {
        const user_id = req.token.id;
        const tattoo_id = req.body.tattoo_id;
        const observations = req.body.observations;
        const date = req.body.date;
        const appointment_time = req.body.appointment_time;

        const currentTattoo = await Product.findOneBy(
            {
                id: tattoo_id
            }
        )

        if (!currentTattoo) {
            return res.status(400).json({
                success: false,
                message: "Tattoo not found",
            });
        }

        const tattoo_artist_id = currentTattoo.tattoo_artist_id;

        // La lógica funciona, no deja generar citas en el pasado, 
        // el día de hoy y el fin de semana, pero no consigo solucionar 
        // un bug en el que si el dia pasa de 12 (como un mes) me da error
        // se puede comprobar con el log de abajo.
        // Lo más probable es que sea un error en el formato pasado (req.query.date) 
        // y el formato que espera recibir, creo que (YYYY-MM-DD)
        const appointmentDate = date;
        const appointmentDateFormat = dayjs(appointmentDate).format('DD-MM-YYYY')
        const appointmentDay = dayjs(appointmentDateFormat).format('DD')
        const appointmentMonth = dayjs(appointmentDateFormat).format('MM')
        const appointmentYear = dayjs(appointmentDateFormat).format('YYYY')
        const today = new Date();
        const dateToday = dayjs(today).format('DD-MM-YYYY')
        const day = dayjs(today).format('DD')
        const month = dayjs(today).format('MM')
        const year = dayjs(today).format('YYYY')

        // console.log(today, dateToday, day, month, year, appointmentDay, appointmentMonth, appointmentYear);

        if ((appointmentMonth < month || appointmentYear < year) || (appointmentMonth <= month && appointmentDay < day)) {
            return res.status(400).json(
                {
                    success: true,
                    message: 'Time travel not allowed at this time',
                }
            )
        }

        const weekDayFormat = dayjs(appointmentDate).format('DD-MM-YYYY') // display
        const weekDay = dayjs(weekDayFormat).format('dddd') // display

        if (appointmentDate === dateToday) {
            return res.status(400).json(
                {
                    success: true,
                    message: 'Appointments only avaible from next day',
                }
            )
        }

        if (weekDay === "Saturday" || weekDay === "Sunday") {
            return res.status(400).json(
                {
                    success: true,
                    message: 'Appointments not avaible on weekend',
                }
            )
        }

        const existAppointment = await Appointment.findOne({
            where: {
                tattoo_artist_id,
                date,
                appointment_time,
            },
        });

        if (existAppointment) {
            return res.status(400).json({
                success: false,
                message: "Appointment already exists for this tattoo artist at this date and time",
            });
        }

        const task = await Appointment.create(
            {
                user_id,
                tattoo_artist_id,
                tattoo_id,
                observations,
                date,
                appointment_time
            }
        ).save()

        return res.json(
            {
                success: true,
                message: "users retrieved",
                data: task
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "appointment can't be created",
                error: error,
            }
        )
    }
}

const getAllMyAppointments = async (req: Request, res: Response) => {
    try {

        const allmyappointmentes = await Appointment.find({
            where: {
                user_id: req.token.id
            }
        })

        return res.json(
            {
                success: true,
                message: "profile user retrieved",
                data: allmyappointmentes
                // data: user?.email
            });
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "user can't get profile",
                error: error
            }
        )
    }
}

const getSingleAppointment = async (req: Request, res: Response) => {
    try {
        const user_id = req.token.id;
        const appointment_id = req.params.id;

        const appointment = await Appointment.findOne({
            where: {
                id: parseInt(appointment_id as string),
                user_id: user_id,
            },
            relations: ["tattoo", "tattooArtist"], // Se hace referencia al modelo
        });

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }

        return res.json({
            success: true,
            message: "Appointment retrieved",
            data: appointment,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while retrieving appointment",
            error: error,
        });
    }
};

const updateAppointment = async (req: Request, res: Response) => {
    try {
        const appointmentIdToUpdate = req.params.id;

        const appointment = await Appointment.findOne({
            where: {
                id: parseInt(appointmentIdToUpdate),
                user_id: req.token.id,
            },
        });

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }

        if (req.body.observations) {
            appointment.observations = req.body.observations;
        }
        if (req.body.date) {
            appointment.date = req.body.date;
        }
        if (req.body.appointment_time) {
            appointment.appointment_time = req.body.appointment_time;
        }

        const updatedAppointment = await appointment.save();

        return res.json({
            success: true,
            message: "Appointment updated successfully",
            data: updatedAppointment,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Appointment update failed",
            error: error,
        });
    }
}

const deleteAppointment = async (req: Request, res: Response) => {

    try {
        const appointmentIdToDelete = req.params.id;
        const appointmentDeleted = await Appointment.delete(
            {
                id: parseInt(appointmentIdToDelete)
            }
        );

        if (appointmentDeleted.affected) {
            return res.json(`The appointment with ID:${appointmentIdToDelete} has been successfully deleted.`);
        }
        return res.json(`Nothing to to delete here`);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while deleting appointment",
            error: error,
        });
    }

}

const getAllTattooArtist = async (req: Request, res: Response) => {
    try {
        const allTattoArtist = await Staff.find({
            where: {
                id: req.body.tattoo_artist_id
            }
        })

        return res.json(
            {
                success: true,
                message: "profile user retrieved",
                data: allTattoArtist
                // data: user?.email
            });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error searching all tattoo artist",
            error: error,
        });
    }

}

const getAllTattoos = async (req: Request, res: Response) => {
    try {
        const allTattoos = await Product.find({
            where: {
                id: req.body.tattoo_id
            }
        })

        return res.json(
            {
                success: true,
                message: "profile user retrieved",
                data: allTattoos
                // data: user?.email
            });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error searching all tattoos",
            error: error,
        });
    }
}

export { register, login, profile, updateProfile, createAppointment, getAllMyAppointments, getSingleAppointment, deleteAppointment, updateAppointment, getAllTattooArtist, getAllTattoos }
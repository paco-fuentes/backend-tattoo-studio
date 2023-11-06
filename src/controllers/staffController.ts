import { Response, Request } from "express";
import 'dotenv/config'
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Staff } from "../models/Staff";
import { Product } from "../models/Product";
import { Appointment } from "../models/Appointment";
import { User } from "../models/User";

const registerAdmin = async (req: Request, res: Response) => {
    try {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const password = req.body.password;
        const phone = req.body.phone;
        const adress = req.body.adress;
        const role = req.body.role;

        const encryptedPassword = bcrypt.hashSync(password, 10);

        const newStaff = await Staff.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: encryptedPassword,
            phone: phone,
            adress: adress,
            role: role
        }).save();

        return res.json({
            success: true,
            message: "God mode enabled",
            token: newStaff
        });

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "There is no... god",
                error: error,
            }
        )
    }
}

const registerStaff = async (req: Request, res: Response) => {
    try {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const password = req.body.password;
        const phone = req.body.phone;
        const adress = req.body.adress;

        const encryptedPassword = bcrypt.hashSync(password, 10);

        const newStaff = await Staff.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: encryptedPassword,
            phone: phone,
            adress: adress
        }).save();

        return res.json({
            success: true,
            message: "Tattoo artist created succesfully",
            token: newStaff
        });

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Tattoo artist can't be created",
                error: error,
            }
        )
    }
}

const loginStaff = async (req: Request, res: Response) => {
    try {
        const email = req.body.email
        const password = req.body.password

        const user = await Staff.findOneBy(
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
                message: "Tattoo artist can't be loged",
                error: error,
            }
        )
    }
}

const getAllMyAppointments = async (req: Request, res: Response) => {
    try {

        const allmyappointmentes = await Appointment.find({
            where: {
                tattoo_artist_id: req.token.id
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

const registerWork = async (req: Request, res: Response) => {
    try {
        const tattooArtistId = req.token.id
        const product_type = req.body.product_type;
        const title = req.body.title;
        const description = req.body.description;
        const time_amount = req.body.time_amount;
        const price = req.body.price;

        const newTattoo = await Product.create({
            tattoo_artist_id: tattooArtistId,
            product_type: product_type,
            title: title,
            description: description,
            time_amount: time_amount,
            price: price
        }).save();

        return res.json({
            success: true,
            message: "Tattoo created succesfully",
            data: newTattoo
        });

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Tattoo can't be created",
                error: error,
            }
        )
    }
}

const deleteUserById = async (req: Request, res: Response) => {
    try {
        const userIdToDelete = req.params.id;
        const userDeleted = await User.delete(
            {
                id: parseInt(userIdToDelete)
            }
        );

        if (userDeleted.affected) {
            return res.json(`The user with ID:${userIdToDelete} has been successfully deleted.`);
        }
        return res.json(`Nothing to to delete here`);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while deleting user",
            error: error,
        });
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    try {

        const allUsers = await User.find({
            where: {
                id: req.body.user_id
            }
        })

        return res.json(
            {
                success: true,
                message: "profile user retrieved",
                data: allUsers
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

export { registerStaff, loginStaff, registerWork, getAllMyAppointments, registerAdmin, deleteUserById, getAllUsers }
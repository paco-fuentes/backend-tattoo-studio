import { Response, Request } from "express";
import 'dotenv/config'
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Staff } from "../models/Staff";

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

export { registerStaff }
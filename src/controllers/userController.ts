import { Response, Request } from "express";
import 'dotenv/config'
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/User";

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
        )
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
        )
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

        // const userIdToUpdate = req.token.id;
        const user = await User.findOneBy({ id: req.token.id });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Actualiza solo los campos que se proporcionados
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
            // Hashea la contraseña antes de actualizarla
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



// const updateProfile = async (req: Request, res: Response) => {
//     try {
//         const firstname = req.body.firstname;
//         const email = req.body.email;
//         const password = req.body.password;

//         const userIdToUpdate = req.token.id;
//         const userUpdated = await User.update(
//             {
//                 id: userIdToUpdate
//             },
//             {
//                 firstname,
//                 email,
//                 password
//             });

//         if (userUpdated.affected) {
//             return res.json(`Se ha actualizado correctamente el user con id ${userIdToUpdate}`);
//         }
//         return res.json(`No se ha actualizado nada`);


//     } catch (error) {
//         return res.status(500).json(
//             {
//                 success: false,
//                 message: "user can't update profile",
//                 error: error
//             }
//         )
//     }
// }



export { register, login, profile, updateProfile }
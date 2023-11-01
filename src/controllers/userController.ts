import { Response, Request } from "express";
import { User } from "../models/User";

const register = async (req: Request, res: Response) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        const newUser = await User.create({
            username: username,
            email: email,
            password: password
        }).save()

        return res.json({
            success: true,
            message: "User created succesfully",
            token: newUser
        })

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "user can't be created",
                error: error
            }
        )
    }
}

export { register }
import { Response, Request } from "express";
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/User";

const register = async (req: Request, res: Response) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        const encryptedPassword = bcrypt.hashSync(password, 10);

        const newUser = await User.create({
            username: username,
            email: email,
            password: encryptedPassword
        }).save();

        return res.json({
            success: true,
            message: "User created succesfully",
            token: newUser
        });
        // res.send(`<img src="https://http.cat/images/200.jpg">`)

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "user can't be created",
                error: error,
                // url: `<img src="https://http.cat/images/500.jpg">`
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
                    message: 'User or password incorrect',
                }
            )
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json(
              {
                success: true,
                message: 'User or password incorrect',
              }
            )
          }

        return res.json(
            {
                success: true,
                message: "User logged succesfully",
                // token: token
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
        const username = req.body.username;

        const user = await User.findOneBy(
            {
                username
            }
        )
        return res.json(
            {
                success: true,
                message: "profile user retrieved",
                data: user
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
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        const userId = req.params.id;


        const updateUser = await User.update(
            {
                id: parseInt(userId)
            },
            {
                username,
                email,
                password
            }
        )

        return res.json({
            success: true,
            message: "task updated",
            data: updateUser
        })

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "user can't update profile",
                error: error
            }
        )
    }
}

export { register, login, profile, updateProfile }
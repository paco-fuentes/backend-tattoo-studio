import { NextFunction, Request, Response } from "express";

const isUser = (req: any, res: Response, next: NextFunction) => {

    if (req.token.role !== "user") {
        return res.json('You are only a user bro')
    }

    next();
}

export { isUser }
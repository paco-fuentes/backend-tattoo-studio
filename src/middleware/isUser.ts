import { NextFunction, Request, Response } from "express";

const isUser = (req: any, res: Response, next: NextFunction) => {

    if (req.token.role !== "user") {
        return res.json('NO PUEDES PASAR')
    }

    next();
}

export { isUser }
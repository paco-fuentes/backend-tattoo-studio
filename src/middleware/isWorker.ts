import { NextFunction, Request, Response } from "express";

const isWorker = (req: any, res: Response, next: NextFunction) => {

    if (req.token.role !== "worker") {
        return res.json('Artists area')
    }

    next();
}

export { isWorker }
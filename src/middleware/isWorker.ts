import { NextFunction, Request, Response } from "express";

const isWorker = (req: any, res: Response, next: NextFunction) => {

    if (req.token.role !== "worker") {
        return res.json('NO PUEDES PASAR')
    }

    next();
}

export { isWorker }
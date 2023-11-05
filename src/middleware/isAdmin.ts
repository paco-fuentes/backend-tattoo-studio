import { NextFunction, Request, Response } from "express";

const isAdmin = (req: any, res: Response, next: NextFunction) => {

  if (req.token.role !== "admin") {
    return res.json('NO PUEDES PASAR')
  }

  next();
}

export { isAdmin }
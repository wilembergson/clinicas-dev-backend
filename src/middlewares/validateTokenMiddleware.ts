import { NextFunction, Request, Response } from "express";
import ErrorMessage from "../utils/errorMessage.js"

export function validateTokenMiddleware() {
    return (req: Request, res: Response, next: NextFunction) => {
      const authorization = req.headers.authorization
      const token = authorization?.replace("Bearer", "").trim()
      if(!token) ErrorMessage(401, "Falha na autenticação da operação.")
      res.locals.token = token
      next();
    };
  }
import { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";

export function authSchemaMiddleware(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body);
    if (validation.error) {
      return res.status(422).send({ error: validation.error.message });
    }
    console.log('PASSOU PELO MIDDLEWARE')
    next();
  };
}
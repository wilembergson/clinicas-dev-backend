import { HttpRequest, Middleware } from "@infra/protocols"
import { NextFunction, Request, Response } from "express"

export function adaptMiddleware(middleware: Middleware) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      headers: req.headers
    }
    const httpResponse = await middleware.handle(httpRequest)
    //console.log(httpResponse.body)
    if (httpResponse.statusCode === 200) {
      Object.assign(res.locals, { sessionAccount: httpResponse.body })
      //res.locals.user = httpResponse.body
      next()
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }

  }
}
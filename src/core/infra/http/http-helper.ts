import { BaseException, ServerError } from "@application/exceptions"
import { HttpResponse } from "@infra/protocols"

export function badRequest(error: BaseException): HttpResponse {
  return {
    statusCode: error.statuscode,
    body: error
  }
}

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const created = (): HttpResponse => ({
  statusCode: 201,
  body: {
    message: "Account created."
  }
})

export const logged = (token: string): HttpResponse => ({
  statusCode: 200,
  body: {
    token
  }
})
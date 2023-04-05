import { BaseException, ServerException } from "@application/exceptions"
import { HttpResponse } from "@infra/protocols"

export function badRequest(error: BaseException): HttpResponse {
  return {
    statusCode: error.statuscode,
    body: error
  }
}

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerException(error.stack)
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const created = (message: string): HttpResponse => ({
  statusCode: 201,
  body: {
    message
  }
})

export const logged = (token: string): HttpResponse => ({
  statusCode: 200,
  body: {
    token
  }
})
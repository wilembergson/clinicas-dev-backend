import { Account } from "@domain/entities"

export type HttpResponse = {
  statusCode: number
  body: any
}

export type HttpRequest = {
  body?: any
  headers?: any
  params?: any
  sessionAccount?: Account
}
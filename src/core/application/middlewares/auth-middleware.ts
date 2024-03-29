import { Decrypter } from "@application/protocols/cryptografy"
import { LoadAccountByToken } from "@domain/use-cases/account"
import { badRequest, ok, serverError } from "@infra/http/http-helper"
import { HttpRequest, HttpResponse, Middleware } from "@infra/protocols"
import { AccessDeniedException, ExpiredTokenException } from "@application/exceptions"


export class AuthMiddleware implements Middleware {
    constructor(
        private readonly loadAccountByToken: LoadAccountByToken,
        private readonly decrypter: Decrypter
    ) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const accessToken = httpRequest.headers?.['authorization']
            if (!accessToken) return badRequest(new AccessDeniedException())
            await this.decrypter.decrypt(accessToken)
            const account = await this.loadAccountByToken.execute(accessToken)
            return ok(account)
        } catch (error) {
            if (error.name === 'TokenExpiredError') return badRequest(new ExpiredTokenException(error))
            if (error.name === 'JsonWebTokenError') return badRequest(new AccessDeniedException())
            return serverError(error)
        }
    }
}
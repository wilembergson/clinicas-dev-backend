import { Middleware } from "@infra/protocols";
import { AuthMiddleware } from "@application/middlewares";
import { loadAccountByTokenFactory } from "../use-cases";
import { JwtAdapter } from "@infra/cryptografy";

export function makeAuthMiddleware(): Middleware{
    return new AuthMiddleware(loadAccountByTokenFactory(), new JwtAdapter(process.env.JWT_SECRET))
}
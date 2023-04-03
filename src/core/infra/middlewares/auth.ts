import { adaptMiddleware } from "@infra/adapters";
import { makeAuthMiddleware } from "@infra/factories/middlewares/auth-middleware-factory";

export const auth = adaptMiddleware(makeAuthMiddleware())
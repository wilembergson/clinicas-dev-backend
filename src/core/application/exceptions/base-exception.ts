export class BaseException extends Error {
    constructor(
        readonly name: string,
        readonly message: string,
        readonly statuscode: number,
        readonly stack?: string
    ) {
        super()
    }
}
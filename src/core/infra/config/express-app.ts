import express from "express";
import "express-async-errors"
import cors from "cors"
import serverRouter from "../routes/sever.router"

export class ExpressApp {
    private readonly app: express.Application
    private readonly router: express.Router

    constructor() {
        this.router = serverRouter
        this.app = express()
        this.configMiddlewares()
    }

    public get getInstance(): express.Application {
        this.configMiddlewares()
        return this.app;
    }

    protected configMiddlewares(): void {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(this.router);
    }

    public async getPort(): Promise<number>{
        return await this.app.get('port')
    }

    public async init(port?:number): Promise<void> {
        const { PORT } = process.env;
        this.app.listen(port || PORT || 5000, () => console.log(`Running on port ${PORT}...`))
      }
}
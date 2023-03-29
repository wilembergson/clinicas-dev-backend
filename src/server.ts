import { ExpressApp } from "./core/infra/config"
import dotenv from "dotenv"

dotenv.config()

async function Bootstrap(): Promise<void> {
    const app = new ExpressApp()
    await app.init()
}

Bootstrap().catch((error) => {
    console.log(error);
    process.exit(1)
  });
  
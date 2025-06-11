import dotenv from "dotenv";

dotenv.config()

// Interface for environmental variables
interface Config {
  port: number,
  dbConnectionString: string
  dbName: string
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  dbConnectionString: process.env.DB_CONNECTION_STRING || "",
  dbName: process.env.DATABASE_NAME || ""
}

export default config
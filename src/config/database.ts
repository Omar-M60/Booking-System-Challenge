import mongoose from "mongoose";
import config from "./config"

// Connect database
export const connect = async () => {
  await mongoose.connect(`${config.dbConnectionString}${config.dbName}`)
}
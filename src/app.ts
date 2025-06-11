import express from "express";
import seatsRoutes from "./routes/seats";
import { connect } from "./config/database"
import mongoose from "mongoose";

const app = express()

// For debugging purposes
// When the queries fail and need to know what Mongoose is sending to the database
// Most used for checking if the Model is connected to the corresponding collection in the database
// mongoose.set('debug', true);


try {
  connect()
  console.log("Successfully Connected to database")
} catch (e) {
  mongoose.connection.on('error', (err) => console.log(`Error: ${err}`))
}

app.use("/api/events", seatsRoutes)

export default app

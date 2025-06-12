import {Schema, model} from "mongoose"

interface ISeat {
  seatID: string,
  eventID: string,
  name: string,
  isTaken: boolean,
  lockedUntil?: Date,
  lockedBy?: string
}

const seatsSchema = new Schema<ISeat>({
  seatID: {type: String, required: true},
  eventID: {type: String, required: true},
  name: {type: String, required: true},
  isTaken: {type: Boolean, required: true},
  lockedUntil: {type: Date, default: new Date(Date.now() + 5 * 60 * 1000)},
  lockedBy: {type: String, default: "Customer X"}
})

const Seats = model("Seat", seatsSchema, "Seats")

export default Seats
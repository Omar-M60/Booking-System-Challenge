import {Schema, model} from "mongoose"

interface ISeat {
  seatID: string,
  eventID: String,
  name: string,
  isTaken: boolean
}

const seatsSchema = new Schema<ISeat>({
  seatID: {type: String, required: true},
  eventID: {type: String, required: true},
  name: {type: String, required: true},
  isTaken: {type: Boolean, required: true},
})

const Seats = model("Seat", seatsSchema, "Seats")

export default Seats
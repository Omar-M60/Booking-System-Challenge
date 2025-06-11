import {Schema, model} from "mongoose"

interface IReservation {
  reservationID: string,
  orderID: string,
  customerID: string,
  eventID: string,
  seatIDs: Array<string>
}

const reservationsSchema = new Schema<IReservation>({
  reservationID: {type: String, required: true},
  orderID: {type: String, required: true},
  customerID: {type: String, required: true},
  eventID: {type: String, required: true},
  seatIDs: {type: [String], required: true},
})

const Reservations = model("Reservation", reservationsSchema, "Reservations")

export default Reservations
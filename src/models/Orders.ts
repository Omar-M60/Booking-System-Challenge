import {Schema, model} from "mongoose"

enum Currency {
  USD = "USD",
  LB = "LB"
}

enum Status {
  Paid = "Paid",
  Pending = "Pending",
  Canceled = "Canceled"
}

interface IOrder {
  orderID: string,
  customerID: string,
  amount: number,
  currency: Currency,
  status: Status
}

const ordersSchema = new Schema<IOrder>({
  orderID: {type: String, required: true,},
  customerID: {type: String, required: true},
  amount: {type: Number, required: true},
  currency: {type: String, required: true, enum: Currency},
  status: {type: String, required: true, enum: Status}
})

const Orders = model("Order", ordersSchema, "Orders")

export default Orders
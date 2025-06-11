import { model, Schema } from "mongoose";

interface IEvent {
  eventID: string,
  name: string
}

const eventsSchema = new Schema<IEvent>({
  eventID: {type: String, required: true,},
  name: {type: String, required: true,},
})

const Event = model<IEvent>("Event", eventsSchema, "Events")

export default Event;
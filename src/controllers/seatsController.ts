import Seats from "../models/Seats";
import { Request, Response, NextFunction } from "express";

// Get all event seats
export const getAllSeats = async (req: Request, res: Response, next: NextFunction,) => {
  try {
    // console.log(req.params)
    const eventId = req.params.eventID ?? ""
    // Find all seats that has the eventID equals to the event id sent by the request
    const seats = await Seats.find({eventID: eventId}).exec()
    // console.log(seats)

    if (seats.length == 0) {
      res.status(200).json({message: "There are no seats associated with this event."})
      return
    }

    res.status(200).json(seats)

  } catch (error) {
    next(error)
  }
}
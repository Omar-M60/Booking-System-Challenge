import Seats from "../models/Seats";
import { Request, Response, NextFunction } from "express";

// Get all event seats
export const getAllSeats = async (req: Request, res: Response, next: NextFunction,) => {
  try {
    // console.log(req.params)
    const eventId = req.params.eventID
    if (!eventId) {
      res.status(400).json({message: "Invalid Event Id"})
      return
    }

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

export const checkout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const eventId = req.params
    const { seatIds, customerId } = req.body

    if (!eventId || !Array.isArray(seatIds) || seatIds.length == 0) {
      res.status(400).json({message: "Invalid Event Id or Seat Ids"})
      return
    }

    const now = new Date()
    const expireDate = new Date(now.getTime() + 5 * 60 * 1000)

    const results = await Seats.updateMany({
      seatID: { $in: seatIds },
      eventID: eventId,
      isTaken: false,
      $or: [
        { lockedUntil: null },
        { lockedUntil: { $lt: now }}
      ],
    },
    {
      $set: {
        lockedBy: customerId,
        lockedUntil: expireDate
      }
    }
  )

  if (results.modifiedCount !== seatIds.length) {
    res.status(400).json({ message: "One or more seats are either locked or taken" })
    return
  }

  res.status(200).json({
    message: "Seats locked successfully",
    seatIds,
    expireDate
  })

  } catch (error) {
    next(error)
  }
}

export const confirmBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const eventId = req.params
    const { seatIds, customerId } = req.body

    const now = new Date()

    const seats = await Seats.find({
      seatID: { $in: seatIds },
      eventID: eventId,
      isTaken: false,
      lockedBy: customerId,
      lockedUntil: { $gt: now }
    })

    if (seats.length !== seatIds.length) {
      res.status(400).json({message: "Lock expired or not owned." })
      return
    }

    await Seats.updateMany(
      {
        seatID: { $in: seatIds },
        eventID: eventId
      },
      {
        $set: {
          isTaken: true
        },
        $unset: {
          lockedUntil: "",
          lockedBy: ""
        }
      }
    );

    res.status(200).json({ message: "Booking confirmed!" });

  } catch (error) {
    next(error);
  }
};
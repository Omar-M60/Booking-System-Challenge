import { Router } from "express";

import { getAllSeats, checkout, confirmBooking } from "../controllers/seatsController";

const router = Router();

// When this route is requested get all seats
router.get("/:eventID/seats", getAllSeats)

// Checkout
router.post("/:eventID/checkout", checkout)

// Confirm Booking
router.post("/:eventID/confirmBooking", confirmBooking)

export default router
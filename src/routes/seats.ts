import { Router } from "express";

import { getAllSeats } from "../controllers/seatsController";

const router = Router();

// When this route is requested get all seats
router.get("/:eventID/seats", getAllSeats)

export default router
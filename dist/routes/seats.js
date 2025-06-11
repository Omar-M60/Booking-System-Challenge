"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seatsController_1 = require("../controllers/seatsController");
const router = (0, express_1.Router)();
router.get("/", seatsController_1.getAllSeats);
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const seatsSchema = new mongoose_1.Schema({
    seatID: { type: String, required: true },
    eventID: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Events" },
    name: { type: String, required: true },
    isTaken: { type: Boolean, required: true },
});
const Seats = (0, mongoose_1.model)("Seats", seatsSchema);
exports.default = Seats;

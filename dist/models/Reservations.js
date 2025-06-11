"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reservationsSchema = new mongoose_1.Schema({
    reservationID: { type: String, required: true },
    orderID: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Orders" },
    customerID: { type: String, required: true },
    eventID: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Events" },
    seatIDs: { type: [mongoose_1.Schema.Types.ObjectId], required: true, ref: "Seats" },
});
const Reservations = (0, mongoose_1.model)("Reservations", reservationsSchema);
exports.default = Reservations;

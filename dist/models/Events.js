"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const eventsSchema = new mongoose_1.Schema({
    eventID: { type: String, required: true, },
    name: { type: String, required: true, },
});
const Event = (0, mongoose_1.model)("Events", eventsSchema);
exports.default = Event;

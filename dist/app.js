"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const seats_1 = __importDefault(require("./routes/seats"));
const database_1 = require("./config/database");
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
try {
    (0, database_1.connect)();
}
catch (e) {
    mongoose_1.default.connection.on('error', (err) => console.log(`Error: ${err}`));
}
app.use("/api/events/:eventID/seats", seats_1.default);
exports.default = app;

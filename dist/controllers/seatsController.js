"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSeats = void 0;
const Seats_1 = __importDefault(require("../models/Seats"));
const getAllSeats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const eventId = (_a = req.params.eventID) !== null && _a !== void 0 ? _a : "";
        const seats = yield Seats_1.default.find({ eventID: eventId }).exec();
        if (seats.length == 0) {
            res.status(404).json({ message: "There are no seats associated with this event." });
            return;
        }
        res.json(seats);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllSeats = getAllSeats;

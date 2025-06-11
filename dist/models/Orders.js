"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var Currency;
(function (Currency) {
    Currency["USD"] = "USD";
    Currency["LB"] = "LB";
})(Currency || (Currency = {}));
var Status;
(function (Status) {
    Status["Paid"] = "Paid";
    Status["Pending"] = "Pending";
    Status["Canceled"] = "Canceled";
})(Status || (Status = {}));
const ordersSchema = new mongoose_1.Schema({
    orderID: { type: String, required: true, },
    customerID: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, enum: Currency },
    status: { type: String, required: true, enum: Status }
});
const Orders = (0, mongoose_1.model)("Orders", ordersSchema);
exports.default = Orders;

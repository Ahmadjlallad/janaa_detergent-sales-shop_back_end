"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ItemsSchema = new mongoose_1.Schema({
    name: String,
    barcode: String,
    price: Number,
    quantity: Number,
    wholesalePrice: Number,
    totalPrice: Number,
    wholesalePriceTotalPrice: Number,
});
const receiptSchema = new mongoose_1.Schema({
    items: [ItemsSchema],
    date: String,
    time: String,
    total: Number,
    isPaid: Boolean,
    receiptNumber: Number,
    receiptNumberForThisDay: Number,
    netProfit: Number,
});
exports.default = (0, mongoose_1.model)("receipt", receiptSchema);

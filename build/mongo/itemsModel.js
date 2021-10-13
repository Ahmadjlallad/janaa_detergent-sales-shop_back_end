"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ItemsSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    barcode: { type: String, default: null },
    price: { type: Number, required: true },
    wholesalePrice: { type: Number, required: true },
});
exports.default = (0, mongoose_1.model)("Items", ItemsSchema);

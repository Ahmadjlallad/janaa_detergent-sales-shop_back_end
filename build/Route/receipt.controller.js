"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const receiptRouter = express_1.default.Router();
const receiptModel_1 = __importDefault(require("./../mongo/receiptModel"));
receiptRouter.get("/", async (req, res) => {
    try {
        const { q, value } = req.query;
        if (value && q) {
            const queryReceipt = await receiptModel_1.default.find({ [q]: value });
            res.send(queryReceipt);
        }
        else {
            const allReceipt = await receiptModel_1.default.find({});
            res.send(allReceipt);
        }
    }
    catch (e) {
        res.send(e);
    }
});
receiptRouter.post("/", async (req, res) => {
    try {
        const allReceipt = await receiptModel_1.default.find({});
        const todayReceipt = await receiptModel_1.default.find({ date: req.body.date });
        console.log(todayReceipt);
        const latestReceipt = allReceipt.length;
        const latestReceiptForThisDay = todayReceipt.length;
        console.log(latestReceiptForThisDay);
        const receipt = await receiptModel_1.default.create({
            ...req.body,
            receiptNumber: latestReceipt,
            receiptNumberForThisDay: latestReceiptForThisDay,
        });
        res.send(receipt);
    }
    catch (e) {
        res.send(e);
    }
});
receiptRouter
    .route("/:id")
    .put(async (req, res) => {
    try {
        const receipt = await receiptModel_1.default.findByIdAndUpdate(req.params.id, req.body);
        res.send(receipt);
    }
    catch (e) {
        res.send(e);
    }
})
    .delete(async (req, res) => {
    try {
        const receipt = await receiptModel_1.default.findByIdAndDelete(req.params.id);
        res.send(receipt);
    }
    catch (e) {
        res.send(e);
    }
});
receiptRouter.get("*", (_, res) => {
    res.send("welcome to items try deferent /recipe/ point");
});
exports.default = receiptRouter;

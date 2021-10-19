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
const express_1 = __importDefault(require("express"));
const receiptRouter = express_1.default.Router();
const receiptModel_1 = __importDefault(require("./../mongo/receiptModel"));
receiptRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { q, value } = req.query;
        if (value && q) {
            const queryReceipt = yield receiptModel_1.default.find({ [q]: value });
            res.send(queryReceipt);
        }
        else {
            const allReceipt = yield receiptModel_1.default.find({});
            res.send(allReceipt);
        }
    }
    catch (e) {
        res.send(e);
    }
}));
receiptRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const myDate = new Date();
    const todayDate = `${myDate.getFullYear()}-${myDate.getMonth() + 1}-${myDate.getDate()}`;
    try {
        const allReceipt = yield receiptModel_1.default.find({});
        const todayReceipt = yield receiptModel_1.default.find({ date: todayDate });
        const latestReceipt = allReceipt.length;
        const latestReceiptForThisDay = todayReceipt.length;
        const receipt = yield receiptModel_1.default.create(Object.assign(Object.assign({}, req.body), { receiptNumber: latestReceipt, receiptNumberForThisDay: latestReceiptForThisDay }));
        res.send(receipt);
    }
    catch (e) {
        res.send(e);
    }
}));
receiptRouter
    .route("/:id")
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receipt = yield receiptModel_1.default.findByIdAndUpdate(req.params.id, req.body);
        res.send(receipt);
    }
    catch (e) {
        res.send(e);
    }
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receipt = yield receiptModel_1.default.findByIdAndDelete(req.params.id);
        res.send(receipt);
    }
    catch (e) {
        res.send(e);
    }
}));
receiptRouter.get("*", (_, res) => {
    res.send("welcome to items try deferent /recipe/ point");
});
exports.default = receiptRouter;

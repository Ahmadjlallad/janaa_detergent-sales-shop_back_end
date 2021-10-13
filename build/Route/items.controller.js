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
const itemsModel_1 = __importDefault(require("../mongo/itemsModel"));
const itemsRouter = express_1.default.Router();
itemsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { value, type } = req.query;
    try {
        const allItems = yield itemsModel_1.default.find({});
        if (type === "all") {
            res.send(allItems);
        }
        else {
            const filteredItems = allItems.filter((item) => item[type].includes(value));
            res.send(filteredItems);
        }
    }
    catch (err) {
        res.send(err);
    }
}));
itemsRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newItem = yield itemsModel_1.default.create(req.body);
        res.send(newItem);
    }
    catch (err) {
        res.send(err);
    }
}));
itemsRouter
    .route("/:id")
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedItem = yield itemsModel_1.default.findByIdAndUpdate(req.params.id, req.body);
        res.send(updatedItem);
    }
    catch (err) {
        res.send(err);
    }
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedItem = yield itemsModel_1.default.findByIdAndDelete(req.params.id);
        res.send(deletedItem);
    }
    catch (err) {
        res.send(err);
    }
}));
itemsRouter.get("*", (_, res) => {
    res.send("welcome to items try deferent /items/ point");
});
exports.default = itemsRouter;

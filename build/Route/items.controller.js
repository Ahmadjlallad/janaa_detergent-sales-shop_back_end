"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const itemsModel_1 = __importDefault(require("../mongo/itemsModel"));
const itemsRouter = express_1.default.Router();
itemsRouter.get("/", async (req, res) => {
    const { value, type } = req.query;
    try {
        const allItems = await itemsModel_1.default.find({});
        if (type === "all") {
            res.send(allItems);
        }
        else {
            const filteredItems = allItems.filter((item) => {
                if (item[type] === null)
                    return;
                if (type === "barcode")
                    return Number(item[type]) === Number(value);
                return item[type].includes(value);
            });
            res.send(filteredItems);
        }
    }
    catch (err) {
        res.send(err);
    }
});
itemsRouter.post("/", async (req, res) => {
    try {
        const newItem = await itemsModel_1.default.create(req.body);
        res.send(newItem);
    }
    catch (err) {
        res.send(err);
    }
});
itemsRouter
    .route("/:id")
    .put(async (req, res) => {
    try {
        const updatedItem = await itemsModel_1.default.findByIdAndUpdate(req.params.id, req.body);
        res.send(updatedItem);
    }
    catch (err) {
        res.send(err);
    }
})
    .delete(async (req, res) => {
    try {
        const deletedItem = await itemsModel_1.default.findByIdAndDelete(req.params.id);
        res.send(deletedItem);
    }
    catch (err) {
        res.send(err);
    }
});
itemsRouter.get("*", (_, res) => {
    res.send("welcome to items try deferent /items/ point");
});
exports.default = itemsRouter;

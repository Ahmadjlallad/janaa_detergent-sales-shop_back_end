"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ts_dotenv_1 = require("ts-dotenv");
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const items_controller_1 = __importDefault(require("./Route/items.controller"));
const receipt_controller_1 = __importDefault(require("./Route/receipt.controller"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const env = (0, ts_dotenv_1.load)({
    PORT: Number,
    DB: String,
});
mongoose_1.default.connect(env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Connected to MongoDB");
});
app.use("/items", items_controller_1.default);
app.use("/receipt", receipt_controller_1.default);
app.get("*", (_, res) => {
    res.send("nothing here try /items | /recipe");
});
app.listen(env.PORT, () => {
    console.log("server is running " + env.PORT);
});

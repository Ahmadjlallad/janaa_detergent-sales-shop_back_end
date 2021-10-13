import express from "express";
import { load } from "ts-dotenv";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import itemRouter from "./Route/items.controller";
import receiptRouter from "./Route/receipt.controller";
interface mongooseOptions extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}
const app = express();
app.use(cors());
app.use(express.json());
const env = load({
  PORT: Number,
  DB: String,
});
mongoose.connect(env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongooseOptions);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

app.use("/items", itemRouter);
app.use("/receipt", receiptRouter);
app.get("*", (_, res) => {
  res.send("nothing here try /items | /recipe");
});
app.listen(env.PORT, () => {
  console.log("server is running " + env.PORT);
});

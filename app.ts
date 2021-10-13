import express from "express";
import { load } from "ts-dotenv";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
const env = load({
  PORT: Number,
});

app.listen(env.PORT, () => {
  console.log("server is running " + env.PORT);
});

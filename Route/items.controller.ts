import express, { Request, Response } from "express";
import ItemsModel from "../mongo/itemsModel";
const itemsRouter = express.Router();
interface Query {
  value?: string;
  type?: string;
}
interface Items {
  name?: string;
  barcode?: string;
  price?: number;
  wholesalePrice?: number;
}
itemsRouter.get("/", async (req: Request, res: Response): Promise<void> => {
  const { value, type }: Query = req.query;
  try {
    const allItems = await ItemsModel.find({});
    if (type === "all") {
      res.send(allItems);
    } else {
      const filteredItems = allItems.filter((item: Items) => {
        if (item[type] === null) return;
        if (type === "barcode") return Number(item[type]) === Number(value);
        return item[type].includes(value);
      });
      res.send(filteredItems);
    }
  } catch (err) {
    res.send(err);
  }
});
itemsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newItem = await ItemsModel.create(req.body as Items);
    res.send(newItem);
  } catch (err) {
    res.send(err);
  }
});
itemsRouter
  .route("/:id")
  .put(async (req: Request, res: Response) => {
    try {
      const updatedItem = await ItemsModel.findByIdAndUpdate(
        req.params.id,
        req.body as Items
      );
      res.send(updatedItem);
    } catch (err) {
      res.send(err);
    }
  })
  .delete(async (req: Request, res: Response) => {
    try {
      const deletedItem = await ItemsModel.findByIdAndDelete(req.params.id);
      res.send(deletedItem);
    } catch (err) {
      res.send(err);
    }
  });

itemsRouter.get("*", (_: Request, res: Response) => {
  res.send("welcome to items try deferent /items/ point");
});
export default itemsRouter;

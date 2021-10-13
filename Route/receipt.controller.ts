import express, { Request, Response } from "express";
const receiptRouter = express.Router();
import ReceiptModel, { ReceiptModelInterface } from "./../mongo/receiptModel";

type Query = {
  q?: string;
  value?: string;
};
receiptRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { q, value }: Query = req.query;
    if (value && q) {
      const queryReceipt = await ReceiptModel.find({ [q]: value });
      res.send(queryReceipt);
    } else {
      const allReceipt = await ReceiptModel.find({});
      res.send(allReceipt);
    }
  } catch (e) {
    res.send(e);
  }
});

receiptRouter.post("/", async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const receipt = await ReceiptModel.create(
      req.body as ReceiptModelInterface
    );
    res.send(receipt);
  } catch (e) {
    res.send(e);
  }
});

receiptRouter
  .route("/:id")
  .put(async (req: Request, res: Response) => {
    try {
      const receipt = await ReceiptModel.findByIdAndUpdate(
        req.params.id,
        req.body as ReceiptModelInterface
      );
      res.send(receipt);
    } catch (e) {
      res.send(e);
    }
  })
  .delete(async (req: Request, res: Response) => {
    try {
      const receipt = await ReceiptModel.findByIdAndDelete(req.params.id);
      res.send(receipt);
    } catch (e) {
      res.send(e);
    }
  });
receiptRouter.get("*", (_: Request, res: Response) => {
  res.send("welcome to items try deferent /recipe/ point");
});
export default receiptRouter;

import { Schema, model } from "mongoose";

interface Receipt {
  name: string;
  barcode: string;
  price: number;
  quantity: number;
}

const ItemsSchema = new Schema<Receipt>({
  name: String,
  barcode: String,
  price: Number,
  quantity: Number,
});
export interface ReceiptModelInterface {
  items: Receipt[];
  date: string;
  time: string;
  total: number;
}
const receiptSchema = new Schema<ReceiptModelInterface>({
  items: [ItemsSchema],
  date: String,
  time: String,
  total: Number,
});
export default model<ReceiptModelInterface>("receipt", receiptSchema);

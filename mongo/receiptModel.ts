import { Schema, model } from "mongoose";

interface Receipt {
  name: string;
  barcode: string;
  price: number;
  quantity: number;
  wholesalePrice: number;
  totalPrice: number;
  wholesalePriceTotalPrice: number;
}

const ItemsSchema = new Schema<Receipt>({
  name: String,
  barcode: String,
  price: Number,
  quantity: Number,
  wholesalePrice: Number,
  totalPrice: Number,
  wholesalePriceTotalPrice: Number,
});
export interface ReceiptModelInterface {
  items: Receipt[];
  date: string;
  time: string;
  total: number;
  isPaid: Boolean;
  receiptNumber: number;
  receiptNumberForThisDay: number;
  netProfit: number;
}
const receiptSchema = new Schema<ReceiptModelInterface>({
  items: [ItemsSchema],
  date: String,
  time: String,
  total: Number,
  isPaid: Boolean,
  receiptNumber: Number,
  receiptNumberForThisDay: Number,
  netProfit: Number,
});
export default model<ReceiptModelInterface>("receipt", receiptSchema);

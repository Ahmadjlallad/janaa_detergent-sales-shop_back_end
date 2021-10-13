import { Schema, model } from "mongoose";
interface Items {
  name: string;
  barcode: string | null;
  price: number;
  wholesalePrice: number;
}
const ItemsSchema = new Schema<Items>({
  name: { type: String, required: true },
  barcode: { type: String, default: null },
  price: { type: Number, required: true },
  wholesalePrice: { type: Number, required: true },
});
export default model<Items>("Items", ItemsSchema);

/// <reference types="mongoose" />
interface Receipt {
    name: string;
    barcode: string;
    price: number;
    quantity: number;
    wholesalePrice: number;
    totalPrice: number;
    wholesalePriceTotalPrice: number;
}
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
declare const _default: import("mongoose").Model<ReceiptModelInterface, {}, {}, {}>;
export default _default;

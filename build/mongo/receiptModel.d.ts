/// <reference types="mongoose" />
interface Receipt {
    name: string;
    barcode: string;
    price: number;
    quantity: number;
}
export interface ReceiptModelInterface {
    items: Receipt[];
    date: string;
    time: string;
    total: number;
}
declare const _default: import("mongoose").Model<ReceiptModelInterface, {}, {}, {}>;
export default _default;

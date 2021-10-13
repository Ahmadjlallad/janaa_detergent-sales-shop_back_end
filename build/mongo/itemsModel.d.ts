/// <reference types="mongoose" />
interface Items {
    name: string;
    barcode: string | null;
    price: number;
    wholesalePrice: number;
}
declare const _default: import("mongoose").Model<Items, {}, {}, {}>;
export default _default;

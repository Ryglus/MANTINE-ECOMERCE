import {Product} from "./product.dto";

export interface CartItem extends Product {
    quantity: number;
}

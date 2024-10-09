import {Product} from "./product.dto";

interface CartItem extends Product {
    quantity: number;
}

export interface CartState {
    items: CartItem[];
    addItem: (item: Product, quantity?: number) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
}

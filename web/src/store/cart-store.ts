import {create} from "zustand";
import {Product} from "../lib/api/dto/product.dto";
import {CartState} from "../lib/api/dto/cart.dto";

export const useCartStore = create<CartState>((set) => ({
    items: [],
    addItem: (item: Product, quantity = 1) =>
        set((state) => {
            const existingItem = state.items.find(i => i.id === item.id);
            if (existingItem) {
                return {
                    items: state.items.map(i =>
                        i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
                    ),
                };
            }
            return { items: [...state.items, { ...item, quantity }] };
        }),
    removeItem: (id) =>
        set((state) => ({
            items: state.items.filter((item) => item.id !== id),
        })),
    clearCart: () => set(() => ({ items: [] })),
}));

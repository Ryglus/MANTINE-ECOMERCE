import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {Product} from '../lib/api/dto/product.dto';
import {CartItem} from "../lib/api/dto/cart.dto";

export interface CartState {
    items: CartItem[];
    addItem: (item: Product, quantity?: number) => void;
    removeItem: (id: number) => void;
    updateItemQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],

            addItem: (item: Product, quantity = 1) => {
                set((state) => {
                    const existingItem = state.items.find((i) => i.id === item.id);
                    if (existingItem) {
                        return {
                            items: state.items.map((i) =>
                                i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
                            ),
                        };
                    }
                    return { items: [...state.items, { ...item, quantity }] };
                });
            },

            removeItem: (id: number) => {
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                }));
            },

            updateItemQuantity: (id: number, quantity: number) => {
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id ? { ...item, quantity } : item
                    ),
                }));
            },

            clearCart: () => set({ items: [] }),
        }),
        {
            name: 'velvet-cove/cart',
            partialize: (state) => ({ items: state.items })
        }
    )
);

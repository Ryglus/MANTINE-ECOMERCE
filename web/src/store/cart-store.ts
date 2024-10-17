import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {showNotification} from '@mantine/notifications';
import {Product} from '../lib/api/dto/product.dto';
import {CartItem} from "../lib/api/dto/cart.dto";

export interface CartState {
    items: CartItem[];
    addItem: (item: Product, quantity?: number) => void;
    removeItem: (id: number) => void;
    updateItemQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    getItemQuantity: (id: number) => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item: Product, quantity = 1) => {
                set((state) => {
                    const existingItem = state.items.find((i) => i.id === item.id);
                    if (existingItem) {
                        showNotification({
                            title: 'Item Updated',
                            message: `Updated quantity for ${item.title} in your cart.`,
                            color: 'blue',
                        });
                        return {
                            items: state.items.map((i) =>
                                i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
                            ),
                        };
                    }

                    showNotification({
                        title: 'Item Added',
                        message: `${item.title} has been added to your cart.`,
                        color: 'green',
                    });

                    return { items: [...state.items, { ...item, quantity }] };
                });
            },

            removeItem: (id: number) => {
                set((state) => {
                    const removedItem = state.items.find((item) => item.id === id);
                    if (removedItem) {
                        showNotification({
                            title: 'Item Removed',
                            message: `${removedItem.title} has been removed from your cart.`,
                            color: 'red',
                        });
                    }
                    return {
                        items: state.items.filter((item) => item.id !== id),
                    };
                });
            },

            updateItemQuantity: (id: number, quantity: number) => {
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id ? { ...item, quantity } : item
                    ),
                }));
            },

            clearCart: () => {
                set({ items: [] });
                showNotification({
                    title: 'Cart Cleared',
                    message: 'Your cart has been cleared.',
                    color: 'orange',
                });
            },

            getItemQuantity: (id: number) => {
                const item = get().items.find((item) => item.id === id);
                return item ? item.quantity : 0;
            },
        }),
        {
            name: 'velvet-cove/cart',
            partialize: (state) => ({ items: state.items }),
        }
    )
);

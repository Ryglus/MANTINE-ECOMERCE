import {create} from "zustand";
import {persist} from "zustand/middleware";
import {Product} from "../lib/api/dto/product.dto";

export interface Order {
    id: string;
    userId: number;
    date: string;
    products: { product:Product, quantity:number }[];
    delivery: {
        firstname: string;
        lastname: string;
        city: string;
        street: string;
        number: string;
        zipcode: string;
        phone: string;
    };
    payment: any;
    status: string;
}

interface OrderStore {
    orders: Order[];
    addOrder: (order: Order) => void;
    updateOrderStatus: (id: string, status: string) => void;
    getOrderById: (id: string) => Order | undefined;
    getAllOrders: () => Order[];
}

export const useOrderStore = create<OrderStore>()(
    persist(
        (set, get) => ({
            orders: [],
            addOrder: (order: Order) => {
                const existingOrder = get().orders.find((o) => o.id === order.id);
                if (!existingOrder) {
                    set((state) => ({ orders: [...state.orders, order] }));
                } else {
                    console.warn(`Order with id ${order.id} already exists.`);
                }
            },
            updateOrderStatus: (id: string, status: string) =>
                set((state) => ({
                    orders: state.orders.map((order) =>
                        order.id === id ? { ...order, status } : order
                    ),
                })),
            getOrderById: (id: string) => get().orders.find((order) => order.id === id),
            getAllOrders: () => get().orders,
        }),
        {
            name: "velvet-cove/order",
        }
    )
);

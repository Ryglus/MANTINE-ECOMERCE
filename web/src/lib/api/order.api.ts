import axios from 'axios';
import {useQueries} from "@tanstack/react-query";
import {User} from "./dto/account.dto";
import {Product} from "./dto/product.dto";
import {Order} from "./dto/order.dto";

export const fetchOrders = async (): Promise<Order[]> => {
    const { data } = await axios.get("https://fakestoreapi.com/carts");
    return data;
};

export const fetchUsers = async (): Promise<User[]> => {
    const { data } = await axios.get("https://fakestoreapi.com/users");
    return data;
};

export const fetchProducts = async (): Promise<Product[]> => {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    return data;
};

export const useOrderData = () => {
    const results = useQueries({
        queries: [
            {
                queryKey: ['orders'],
                queryFn: fetchOrders
            },
            {
                queryKey: ['users'],
                queryFn: fetchUsers
            },
            {
                queryKey: ['products'],
                queryFn: fetchProducts
            }
        ]
    });

    const ordersQuery = results[0];
    const usersQuery = results[1];
    const productsQuery = results[2];

    return { ordersQuery, usersQuery, productsQuery };
};

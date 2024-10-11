import {MinifiedOrderData} from "../lib/api/dto/order.dto";

export function generateOrderHash(orderData: MinifiedOrderData): string {
    const jsonString = JSON.stringify(orderData);
    return btoa(jsonString);
}

export function decodeOrderHash(hash: string): MinifiedOrderData {
    const jsonString = atob(hash);
    return JSON.parse(jsonString);
}
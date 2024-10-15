export interface MinifiedOrderData {
    delivery: {
        firstname: string;
        lastname: string;
        city: string;
        street: string;
        number: string;
        zipcode: string;
        phone: string;
    };
    payment: {
        cardholderName: string;
    };
    items: Array<{ id: number; quantity: number }>;
}

interface ProductRecord {
    productId: number;
    quantity: number;
}

export interface Order {
    id: number;
    userId: number;
    date: string;
    products: ProductRecord[];
}
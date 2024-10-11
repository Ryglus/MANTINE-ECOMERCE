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
        billingAddress: string;
    };
    items: Array<{ id: number; quantity: number }>;
}

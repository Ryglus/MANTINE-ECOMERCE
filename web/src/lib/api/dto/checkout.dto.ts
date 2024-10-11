export const getEmptyDeliveryData = (): DeliveryData => ({
    firstname: '',
    lastname: '',
    city: '',
    street: '',
    number: '',
    zipcode: '',
    phone: '',
});

export interface PaymentData {
    cardNumber: string;
    cardholderName: string;
    expiryDate: string;
    cvv: string;
    billingAddress: string;
}

export interface DeliveryData {
    firstname: string;
    lastname: string;
    city: string;
    street: string;
    number: string;
    zipcode: string;
    phone: string;
}

export interface StepData {
    delivery: DeliveryData | null;
    payment: PaymentData | null;
    review: null;
    confirmation: null;
}

export interface StepComponentProps {
    onValidChange?: (isValid: boolean, data: DeliveryData | PaymentData | null) => void;
    data?: StepData;
}

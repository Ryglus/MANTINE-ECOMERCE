import {User} from './account.dto';
import {ShippingChoice, shippingOptions} from "./shipping.dto";

export const getDeliveryData = (user: User | null = null): {
    zipcode: string;
    number: string;
    firstname: string;
    city: string;
    phone: string;
    street: string;
    lastname: string;
    shippingOption?: ShippingChoice
} => {
    const defaultShippingOption: ShippingChoice = {
        company: shippingOptions[0].company,
        option: shippingOptions[0].options[0]
    };

    return {
        firstname: user?.name?.firstname || '',
        lastname: user?.name?.lastname || '',
        city: user?.address?.city || '',
        street: user?.address?.street || '',
        number: String(user?.address?.number || ''),
        zipcode: user?.address?.zipcode || '',
        phone: user?.phone || '',
        shippingOption: defaultShippingOption,
    };
};

export interface PaymentData {
    cardNumber: string;
    cardholderName: string;
    expiryDate: string;
    cvv: string;
    selectedPaymentMethod: string;
}

export interface DeliveryData {
    firstname: string;
    lastname: string;
    city: string;
    street: string;
    number: string;
    zipcode: string;
    phone: string;
    shippingOption?: ShippingChoice;
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


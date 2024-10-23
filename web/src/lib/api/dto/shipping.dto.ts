export enum ShippingCompany {
    CzechPost = 'Czech Post',
    DHL = 'DHL',
    PPL = 'PPL',
    Zasilkovna = 'Zásilkovna',
    DPD = 'DPD',
}

export interface ShippingOption {
    optionName: string;
    price: number;
    estimatedDeliveryTime: string;
    deliveryType: 'home' | 'pickup' | 'express';
}

export interface ShippingCompanyOptions {
    company: ShippingCompany;
    options: ShippingOption[];
}
export interface ShippingChoice {
    company: ShippingCompany;
    option: ShippingOption;
}

export const shippingOptions: ShippingCompanyOptions[] = [
    {
        company: ShippingCompany.CzechPost,
        options: [
            { optionName: 'Standard Shipping', price: 2.15, estimatedDeliveryTime: '2-3 business days', deliveryType: 'home' },
            { optionName: 'Express Shipping', price: 4.30, estimatedDeliveryTime: '1-2 business days', deliveryType: 'express' },
        ],
    },
    {
        company: ShippingCompany.DHL,
        options: [
            { optionName: 'Home Delivery', price: 5.16, estimatedDeliveryTime: '1-2 business days', deliveryType: 'home' },
            { optionName: 'Express Delivery', price: 8.60, estimatedDeliveryTime: '1 business day', deliveryType: 'express' },
        ],
    },
    {
        company: ShippingCompany.PPL,
        options: [
            { optionName: 'Home Delivery', price: 3.87, estimatedDeliveryTime: '2-3 business days', deliveryType: 'home' },
        ],
    },
    {
        company: ShippingCompany.Zasilkovna,
        options: [
            { optionName: 'Pickup at Zásilkovna', price: 1.72, estimatedDeliveryTime: '2-3 business days', deliveryType: 'pickup' },
        ],
    },
    {
        company: ShippingCompany.DPD,
        options: [
            { optionName: 'Home Delivery', price: 4.73, estimatedDeliveryTime: '2 business days', deliveryType: 'home' },
        ],
    },
];


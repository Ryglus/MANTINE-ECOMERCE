import {Text} from '@mantine/core';
import {StepComponentProps} from "../../../lib/api/dto/checkout.dto";
import {useCartStore} from "../../../store/cart-store";
import {useOrderStore} from "../../../store/order-store";
import {useNavigate} from '../../../router';
import {useEffect} from "react";

export default function ConfirmationStep({ data }: StepComponentProps) {
    const { items, clearCart } = useCartStore();
    const { addOrder } = useOrderStore();
    const navigate = useNavigate();
    const orderId = (Math.random() * 10000).toString().replaceAll(".", "");

    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    useEffect(() => {
        if (data?.delivery && data?.payment && items.length > 0) {
            addOrder({
                id: orderId,
                userId: 0,
                date: new Date().toISOString(),
                products: items.map(item => ({ product: item, quantity: item.quantity })),
                delivery: data.delivery,
                payment: {
                    ...data.payment,
                    totalPrice: (totalPrice + Number(data?.delivery?.shippingOption?.option?.price)),
                    itemPrice: totalPrice,
                    shippingPrice: data.delivery.shippingOption?.option.price
                },
                status: "Pending",
            });

            clearCart();

            navigate("/orders/:id",{params:{id:(orderId).toString()}, replace: true });
        }
    }, [data, items, addOrder, clearCart, navigate, orderId, totalPrice]);

    return <Text>Thank you for your order! You are being redirected to your order summary...</Text>;
}

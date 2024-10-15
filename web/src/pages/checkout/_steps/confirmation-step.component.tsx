import {Text} from '@mantine/core';
import {StepComponentProps} from "../../../lib/api/dto/checkout.dto";
import {useCartStore} from "../../../store/cart-store";
import {useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {generateOrderHash} from "../../../utils/otherHasher";
import {MinifiedOrderData} from "../../../lib/api/dto/order.dto";

export default function ConfirmationStep({ data }: StepComponentProps) {
    const { items, clearCart } = useCartStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (data?.delivery && data?.payment && items.length > 0) {
            const minifiedOrder: MinifiedOrderData = {
                delivery: data.delivery,
                payment: {
                    cardholderName: data.payment.cardholderName,
                },
                items: items.map(item => ({ id: item.id, quantity: item.quantity })),
            };
            const orderHash = generateOrderHash(minifiedOrder);
            navigate(`/orders/${orderHash}`);
            clearCart();
        }
    }, [data, items, navigate, clearCart]);

    return (
        <div>
            <Text>Thank you for your order! You are being redirected to your order summary...</Text>
        </div>
    );
}

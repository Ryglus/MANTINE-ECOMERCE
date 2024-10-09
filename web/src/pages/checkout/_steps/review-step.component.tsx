import {useCartStore} from '../../../store/cart-store';

export default function ReviewStep() {
    const { items } = useCartStore();

    return (
        <div>
            <h2>Review Order</h2>
            {items.map((item) => (
                <div key={item.id}>
                    <p>{item.title} - {item.quantity} x ${item.price}</p>
                </div>
            ))}
        </div>
    );
}

import {useCartStore} from '../../../store/cart-store';
import ProductIncartCard from "../../../components/_cards/product-incart.card";

export default function ReviewStep() {
    const { items } = useCartStore();

    return (
        <div>
            <h2>Review Order</h2>
            {items.map((item) => (
                <ProductIncartCard
                    key={item.id}
                    product={item}
                    quantity={item.quantity}
                    isEditable={false}
                />
            ))}
        </div>
    );
}

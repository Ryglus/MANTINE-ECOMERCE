import {ActionIcon, Card, Group, NumberInput, Stack, Text} from "@mantine/core";
import React, {useState} from "react";
import {Product} from "../../lib/api/dto/product.dto";
import {useCartStore} from "../../store/cart-store";
import {IconTrash} from "@tabler/icons-react";
import ImgScaleWithBg from "../img-scale-with-bg.component";
import {buildProductUrl} from "../../utils/urlBuilder";
import {Link} from "react-router-dom";

interface ProductIncartCardProps {
    product: Product;
    quantity: number;
    isEditable?: boolean;
}

export default function ProductIncartCard({ product, quantity, isEditable = true }: ProductIncartCardProps) {
    const removeItem = useCartStore((state) => state.removeItem);
    const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
    const [currentQuantity, setCurrentQuantity] = useState(quantity);
    const totalPrice = (product.price * currentQuantity).toFixed(2);

    const handleQuantityChange = (newQuantity: number | undefined) => {
        if (newQuantity) {
            setCurrentQuantity(newQuantity);
            updateItemQuantity(product.id, newQuantity);
        }
    };

    return (
        <Card shadow="sm" p="lg" mb="lg" key={product.id} radius="md">
            <Group align="flex-start">
                <ImgScaleWithBg img={product.image} alt={product.title} className="relative h-[90px] aspect-square rounded-xl p-1" />

                <Stack gap="xs" style={{ flex: 1 }}>
                    <Text fw={500} lineClamp={1}>
                        {product.title}
                    </Text>
                    {isEditable ? (
                        <NumberInput
                            value={currentQuantity}
                            onChange={(value) => handleQuantityChange(Number(value))}
                            min={1}
                            label="Quantity"
                            size="sm"
                            styles={{ input: { maxWidth: 60 } }}
                        />
                    ) : (
                        <Text size="sm" c="dimmed">
                            ${product.price.toFixed(2)} x {currentQuantity}
                        </Text>
                    )}
                    <Text size="sm" fw={600}>
                        Total: ${totalPrice}
                    </Text>
                </Stack>

                <Group dir="column" align="center" gap="xs" className={"z-10"}>

                    {isEditable && (
                        <ActionIcon variant="outline" color="red" size="xl" onClick={() => removeItem(product.id)}>
                            <IconTrash size={22} />
                        </ActionIcon>
                    )}
                </Group>
            </Group>
            <Link to={buildProductUrl(product.category, product.id, product.title)} className="absolute inset-0" />
        </Card>
    );
}

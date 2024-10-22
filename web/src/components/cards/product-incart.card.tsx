import React, {useState} from "react";
import {ActionIcon, Grid, Text, Title} from "@mantine/core";
import {IconTrash} from "@tabler/icons-react";

import {Product} from "../../lib/api/dto/product.dto";
import {useCartStore} from "../../store/cart-store";
import ImgScaleWithBg from "../common/img-scale-with-bg.component";

import QtyInput from "../inputs/qty-input.component";
import {Link} from "../../router";

interface ProductIncartCardProps {
    product: Product;
    quantity: number;
    isEditable?: boolean;
}

export default function ProductIncartCard(
    {
        product,
        quantity,
        isEditable = true,
    }: ProductIncartCardProps) {

    const removeItem = useCartStore((state) => state.removeItem);
    const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
    const [currentQuantity, setCurrentQuantity] = useState(quantity);

    const handleQuantityChange = (newQuantity: number) => {
        setCurrentQuantity(newQuantity);
        updateItemQuantity(product.id, newQuantity);
    };

    const totalPrice = (product.price * currentQuantity).toFixed(2);

    return (
        <div className="relative hover:shadow-lg transition-shadow duration-300 p-2">
            <Grid grow align="center">
                <Grid.Col span={{ base: 2, md: "auto" }}>
                    <ImgScaleWithBg
                        img={product.image}
                        alt={product.title}
                        className="relative h-[70px] w-[70px] md:h-[100px] md:w-[100px] flex-shrink-0 rounded-md"
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 10 }}>
                    <Grid align="center">
                        <Grid.Col span={{ base: 12, md: 7 }}>
                            <Title size="lg" className="line-clamp-1">
                                {product.title}
                            </Title>
                            <Text size="sm" fw={500} c="dimmed">
                                Unit Price: ${product.price.toFixed(2)}
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={{ base: 6, md: "auto" }} className="relative z-20">
                            {isEditable && (
                                <QtyInput
                                    size="sm"
                                    min={1}
                                    value={currentQuantity}
                                    onChange={handleQuantityChange}
                                    className="z-20 relative"
                                />
                            )}
                        </Grid.Col>
                        <Grid.Col span="auto">
                            <Text size="lg" fw={600} className="text-center">
                                ${totalPrice}
                            </Text>
                        </Grid.Col>
                    </Grid>
                </Grid.Col>
            </Grid>

            {isEditable && (
                <ActionIcon
                    variant="light"
                    color="red"
                    size="lg"
                    onClick={() => removeItem(product.id)}
                    className="hover:scale-110 transition-transform duration-200 z-20 absolute top-2 right-2"
                >
                    <IconTrash size={18} />
                </ActionIcon>
            )}
            <Link to="/products/:category/:id/:slug?" params={{category:product.category,id:(product.id).toString()}} className="absolute inset-0 z-10" />
        </div>
    );
}

import {Badge, Button, Card, Center, Stack, Text} from "@mantine/core";
import {Link} from "react-router-dom";
import {buildProductUrl} from "../../utils/urlBuilder";
import ImgScaleWithBg from "../ui/img-scale-with-bg.component";
import React from "react";
import {useCartStore} from "../../store/cart-store";
import {Product} from "../../lib/api/dto/product.dto";
import CartQuantity from "../cart-quantity.component";

interface ProductCardProps {
    product: Product;
    size?: "sm" | "md" | "lg" | number;
}

const ProductCard = ({ product, size = "md" }: ProductCardProps) => {
    const addItem = useCartStore((state) => state.addItem);
    const itemQuantity = useCartStore((state) => state.items.find((i) => i.id === product.id)?.quantity || 0);

    const handleAddToCart = () => {
        if (product) {
            addItem(product, 1);
        }
    };

    const getHeight = () => {
        if (typeof size === "number") {
            return `${size}px`;
        }
        switch (size) {
            case "sm":
                return "100px";
            case "md":
                return "200px";
            case "lg":
                return "620px";
            default:
                return "200px";
        }
    };

    return (
        <Card
            key={product.id}
            shadow="md"
            radius="md"
            bg={"bg.9"}
            className="relative overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-lg"
            style={{ height: "100%", display: "flex", flexDirection: "column", padding: 0 }}
        >
            <div
                className="relative flex items-center justify-center overflow-hidden rounded-md"
                style={{ height: getHeight() }}
            >
                <Badge color="pink" variant="filled" className="absolute top-2 left-2">
                    {product.category}
                </Badge>
                <ImgScaleWithBg loading="lazy" img={product.image} alt={product.title} className="object-contain h-full w-full" />
            </div>

            <Center m={"xs"} style={{ flexGrow: 1 }}>
                <Stack gap="xs" className={"w-full"}>
                    <Text fw={500} className="text-lg text-center line-clamp-2" title={product.title}>
                        {product.title}
                    </Text>
                    <Text fw={300} className="text-lg text-center" title={product.title}>
                        ${product.price}
                    </Text>
                </Stack>
            </Center>

            <div className="p-2 mt-auto">
                <Button
                    className="z-20 hover:bg[#2b2033] transition-all duration-200 flex justify-start items-center relative w-full"
                    onClick={handleAddToCart}
                >
                    Add to cart
                    <div className="absolute right-1 flex items-center">
                        <CartQuantity quantity={itemQuantity} />
                    </div>
                </Button>
            </div>

            <Link to={buildProductUrl(product.category, product.id, product.title)} className="absolute inset-0 z-10" />
        </Card>
    );
};

export default ProductCard;

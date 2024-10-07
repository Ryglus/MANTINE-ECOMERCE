import { Card, Badge, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import {useImageBackgroundColor} from "../../../../hooks/useImageBackgroundColor";
import {buildProductUrl} from "../../../../utils/urlBuilder";


interface ProductCardProps {
    product: {
        id: number;
        image: string;
        title: string;
        category: string;
        price: number;
    };
}

const ProductCard = ({ product }: ProductCardProps) => {
    const backgroundColor = useImageBackgroundColor(product.image);

    return (
        <Card
            key={product.id}
            shadow="md"
            radius="md"
            withBorder
            className="relative overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-lg"
            style={{ height: "100%" }}
        >
            <div
                className="relative h-[300px] flex items-center justify-center overflow-hidden rounded-md"
                style={{
                    background: backgroundColor || '#f5f5f5',
                }}
            >
                <Badge color="pink" variant="filled" className="absolute top-2 left-2">
                    {product.category}
                </Badge>
                <img
                    src={product.image}
                    alt={product.title}
                    className="object-contain h-full w-full"
                />
                <Badge color="green" variant="filled" className="absolute bottom-2 right-2 text-lg">
                    ${product.price}
                </Badge>
            </div>

            <div className="relative z-10 flex flex-col justify-between">
                <Group p="apart" mt="auto" mb="xs">
                    <Text fw={500} className="text-lg font-semibold line-clamp-2" title={product.title}>
                        {product.title}
                    </Text>
                </Group>
            </div>

            <Link to={buildProductUrl(product.category, product.id, product.title)} className="absolute inset-0 z-20" />
        </Card>
    );
};

export default ProductCard;

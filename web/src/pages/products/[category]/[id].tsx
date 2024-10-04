import { useParams } from '../../../router';

import { Container, Loader, Text, Badge, Group, Image } from '@mantine/core';
import {extractProductIdFromSlug} from "../../../utils/urlBuilder";
import {useFetchProductById} from "../../../lib/api/product.api";


export default function ProductDetailPage() {
    const { category, id } = useParams('/products/:category/:id');

    const productId = extractProductIdFromSlug(id);

    const { data: product, isLoading, error } = useFetchProductById(productId?.toString() ?? '');

    if (isLoading) return <Loader />;
    if (error || !productId) return <div>Error fetching product details</div>;

    return (
        <Container className="mt-5 min-h-dvh">
            <Group dir="column">
                <Image src={product?.image} alt={product?.title} height={300} fit="contain" />
                <Badge color="pink">{category}</Badge>
                <Text size="xl" fw={700}>{product?.title}</Text>
                <Text size="md" fw={500}>{product?.description}</Text>
                <Badge color="green" size="lg">${product?.price}</Badge>
            </Group>
        </Container>
    );
}

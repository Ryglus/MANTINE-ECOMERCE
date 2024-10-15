import {Card, Container, Stack, Text} from '@mantine/core';
import {useEffect, useState} from 'react';
import {MinifiedOrderData} from "../../lib/api/dto/order.dto";
import {decodeOrderHash} from "../../utils/otherHasher";
import ProductIncartCard from "../../components/_cards/product-incart.card";
import {useParams} from "../../router";
import {fetchProductById} from "../../lib/api/product.api";
import {Product} from "../../lib/api/dto/product.dto";
import MainLayout from "../../layouts/index-layout";
import SvgPageBg from "../../components/svg-page-bg.component";

export default function OrderPage() {
    const { hash } = useParams('/orders/:hash');
    const [orderData, setOrderData] = useState<MinifiedOrderData | null>(null);
    const [products, setProducts] = useState<{ id: number, data: Product }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (hash) {
            try {
                const decodedData = decodeOrderHash(hash);
                setOrderData(decodedData);

                const fetchProducts = async () => {
                    const productPromises = decodedData.items.map((item) =>
                        fetchProductById(String(item.id)).then((product) => ({
                            id: item.id,
                            data: product,
                        }))
                    );

                    const fetchedProducts = await Promise.all(productPromises);
                    setProducts(fetchedProducts);
                    setLoading(false);
                };

                fetchProducts();
            } catch (error) {
                console.error('Invalid or corrupted order hash:', error);
                setOrderData(null);
            }
        }
    }, [hash]);

    if (!orderData) {
        return <Text c="red">Invalid order information or corrupted URL.</Text>;
    }

    if (loading) {
        return <Text>Loading products...</Text>;
    }

    return (
        <SvgPageBg>
            <MainLayout>
                <Container size={"xl"}>
                    <h2>Order Summary</h2>

                    <Card shadow="sm" p="lg" mb="md">
                        <h3>Delivery Details</h3>
                        <Stack>
                            <Text>{orderData.delivery.firstname} {orderData.delivery.lastname}</Text>
                            <Text>{orderData.delivery.street} {orderData.delivery.number}</Text>
                            <Text>{orderData.delivery.city}, {orderData.delivery.zipcode}</Text>
                            <Text>{orderData.delivery.phone}</Text>
                        </Stack>
                    </Card>

                    <Card shadow="sm" p="lg" withBorder mb="md">
                        <h3>Payment Details</h3>
                        <Stack>
                            <Text>Cardholder: {orderData.payment.cardholderName}</Text>
                        </Stack>
                    </Card>

                    <h3>Products</h3>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <ProductIncartCard
                                key={product.id}
                                product={product.data}
                                quantity={orderData.items.find(item => item.id === product.id)?.quantity || 1}
                                isEditable={false}
                            />
                        ))
                    ) : (
                        <Text>No products found in this order.</Text>
                    )}
                </Container>
            </MainLayout>
        </SvgPageBg>
    );
}

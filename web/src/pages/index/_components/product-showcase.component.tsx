import { useFetchProducts } from "../../../lib/api/product.api";
import { Container, Loader } from "@mantine/core";
import ProductCard from "./_cards/product.card";


export default function ProductShowcase() {
    const { data: products, isLoading, error } = useFetchProducts();

    if (isLoading) return <Loader />;
    if (error) return <div>Error fetching products</div>;

    return (
        <Container className="mt-5 min-h-dvh">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </Container>
    );
}

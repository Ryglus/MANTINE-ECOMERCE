import {useFetchProducts} from "../../../lib/api/product.api";
import {Container, Loader} from "@mantine/core";


export default function ProductShowcase() {
    const { data: products, isLoading, error } = useFetchProducts();

    if (isLoading) return <Loader />;
    if (error) return <div>Error fetching products</div>;

    return (
        <Container className="mt-5 min-h-dvh">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                {products?.map((product) => (
                    <div key={product.id} className="p-4 bg-white shadow-md rounded-md">
                        <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded-md" />
                        <h3 className="text-lg font-medium mt-2">{product.title}</h3>
                        <p className="text-sm text-gray-500">{product.category}</p>
                        <p className="text-md font-semibold mt-2">${product.price}</p>
                    </div>
                ))}
            </div>
        </Container>
    );
}

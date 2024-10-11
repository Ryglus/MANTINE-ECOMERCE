import {useState} from 'react';
import {useParams} from "../../router";
import {useFetchCategories, useFetchProductsByCategoryOrNot} from "../../lib/api/product.api";
import MainLayout from "../../layouts/index-layout";
import {
    Button,
    Center,
    Container,
    Grid,
    Group,
    Loader,
    NumberInput,
    Pagination,
    SegmentedControl,
    Select,
    TextInput,
    Title
} from "@mantine/core";
import ProductCard from "../../components/_cards/product.card";
import {Product} from "../../lib/api/dto/product.dto";
import {useNavigate} from "react-router-dom";

const productsPerPageOptions = [
    { value: '3', label: '3 per page' },
    { value: '6', label: '6 per page' },
    { value: '9', label: '9 per page' },
];

export default function CategoryPage() {
    const { category } = useParams('/products/:category?');
    const navigate = useNavigate();
    const { data: products, isLoading, error } = useFetchProductsByCategoryOrNot(category);
    const { data: categories } = useFetchCategories();

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(6);

    const [nameFilter, setNameFilter] = useState('');
    const [minPrice, setMinPrice] = useState<number | undefined>();
    const [maxPrice, setMaxPrice] = useState<number | undefined>();
    const [minRating, setMinRating] = useState<number | undefined>();
    const [categoryFilter, setCategoryFilter] = useState<string | null>(category || null);

    const handleProductsPerPageChange = (value: string) => {
        if (value) {
            setProductsPerPage(parseInt(value, 10));
            setCurrentPage(1);
        }
    };

    const handleCategoryChange = (value: string | null) => {
        setCategoryFilter(value);
        if (value) {
            navigate(`/products/${value}`);
        } else {
            navigate('/products');
        }
    };
    const filterProducts = (products: Product[]) => {
        return products.filter((product) => {
            const matchesName = product.title.toLowerCase().includes(nameFilter.toLowerCase());
            const matchesMinPrice = minPrice ? product.price >= minPrice : true;
            const matchesMaxPrice = maxPrice ? product.price <= maxPrice : true;
            const matchesRating = minRating ? product.rating.rate >= minRating : true;
            return matchesName && matchesMinPrice && matchesMaxPrice && matchesRating;
        });
    };

    const filteredProducts = filterProducts(products || []);

    const totalProducts = filteredProducts.length || 0;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return (
        <MainLayout>
            <Container size="xl">
                <Title>Products in {category || "All Categories"}</Title>

                <Group mb="md" grow>
                    <TextInput
                        label="Search by name"
                        placeholder="Enter product name"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.currentTarget.value)}
                    />
                    <NumberInput
                        label="Min Price"
                        value={minPrice}
                        onChange={(value) => setMinPrice(Number(value))}
                        placeholder="Min"
                        min={0}
                    />
                    <NumberInput
                        label="Max Price"
                        value={maxPrice}
                        onChange={(value) => setMaxPrice(Number(value))}
                        placeholder="Max"
                        min={0}
                    />
                    <NumberInput
                        label="Min Rating"
                        value={minRating}
                        onChange={(value) => setMinRating(Number(value))}
                        placeholder="Min"
                        min={0}
                        max={5}
                    />
                    <Select
                        label="Category"
                        placeholder="Pick a category"
                        data={categories || []}
                        value={categoryFilter}
                        onChange={handleCategoryChange}
                        clearable
                    />
                    <Button variant="outline" onClick={() => {
                        setNameFilter('');
                        setMinPrice(undefined);
                        setMaxPrice(undefined);
                        setMinRating(undefined);
                        setCategoryFilter(null);
                    }}>
                        Clear Filters
                    </Button>
                </Group>

                <SegmentedControl
                    data={productsPerPageOptions.map((option) => ({ value: option.value, label: option.label }))}
                    value={productsPerPage.toString()}
                    onChange={handleProductsPerPageChange}
                    size="sm"
                    mb="md"
                />

                <Grid>
                    {isLoading && (
                        <Center>
                            <Loader />
                        </Center>
                    )}
                    {error && (
                        <Title>Error loading products</Title>
                    )}
                    {paginatedProducts && (
                        paginatedProducts.map((product) => (
                            <Grid.Col key={product.id} span={4}>
                                <ProductCard product={product} />
                            </Grid.Col>
                        ))
                    )}
                </Grid>

                <Pagination
                    total={totalPages}
                    value={currentPage}
                    onChange={setCurrentPage}
                    mt="md"
                    p="center"
                />
            </Container>
        </MainLayout>
    );
}

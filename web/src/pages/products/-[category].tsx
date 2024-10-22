import {useEffect, useState} from 'react';
import {useParams} from "../../router";
import {useFetchCategories, useFetchProductsByCategoryOrNot} from "../../lib/api/product.api";
import MainLayout from "../../layouts/index-layout";
import {Center, Container, Grid, GridCol, Loader, Pagination, SegmentedControl, Title} from "@mantine/core";
import ProductCard from "../../components/cards/product.card";
import {Product} from "../../lib/api/dto/product.dto";
import {useNavigate} from "react-router-dom";
import {NumberParam, StringParam, useQueryParams, withDefault} from 'use-query-params';
import ProductFilter from "./_components/product-filter.component";
import SvgPageBg from "../../components/common/svg-page-bg.component";
import useDynamicTitle from "../../hooks/useDynamicTitle";

const productsPerPageOptions = [
    { value: '3', label: '3 per page' },
    { value: '6', label: '6 per page' },
    { value: '9', label: '9 per page' },
];

export default function CategoryPage() {
    const { category } = useParams('/products/:category?');
    useDynamicTitle(`${category || "Products"}`);
    const navigate = useNavigate();
    const { data: products, isLoading, error } = useFetchProductsByCategoryOrNot(category);
    const { data: categories } = useFetchCategories();

    const [query, setQuery] = useQueryParams({
        name: StringParam,
        minPrice: NumberParam,
        maxPrice: NumberParam,
        minRating: NumberParam,
        categoryFilter: StringParam,
        page: withDefault(NumberParam, 1),
        productsPerPage: withDefault(NumberParam, 6)
    });

    const [nameFilter, setNameFilter] = useState(query.name || '');
    const [minPrice, setMinPrice] = useState(query.minPrice || undefined);
    const [maxPrice, setMaxPrice] = useState(query.maxPrice || undefined);
    const [minRating, setMinRating] = useState(query.minRating || undefined);
    const [categoryFilter, setCategoryFilter] = useState(query.categoryFilter || category || null);
    const [currentPage, setCurrentPage] = useState(query.page);
    const [productsPerPage, setProductsPerPage] = useState(query.productsPerPage);

    useEffect(() => {
        setQuery({
            name: nameFilter || undefined,
            minPrice: minPrice || undefined,
            maxPrice: maxPrice || undefined,
            minRating: minRating || undefined,
            categoryFilter: categoryFilter || undefined,
            page: currentPage,
            productsPerPage
        });
    }, [nameFilter, minPrice, maxPrice, minRating, categoryFilter, currentPage, productsPerPage]);

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
        <SvgPageBg>
            <MainLayout>
                <Container size="xl">
                    <div className="flex flex-wrap justify-between items-center gap-4">
                        <Title size={30} className="flex-grow">
                            PRODUCTS FROM {category?.toUpperCase() || "ALL CATEGORIES"}
                        </Title>

                        <SegmentedControl
                            data={productsPerPageOptions.map((option) => ({value: option.value, label: option.label}))}
                            value={productsPerPage.toString()}
                            onChange={handleProductsPerPageChange}
                            size="sm"
                            mb="md"
                            className="w-full sm:w-auto"
                        />
                    </div>

                    <Grid>
                        <GridCol span={{md: 2.5}}>
                            <ProductFilter
                                nameFilter={nameFilter}
                                minPrice={minPrice}
                                maxPrice={maxPrice}
                                minRating={minRating}
                                categoryFilter={categoryFilter}
                                categories={categories}
                                setNameFilter={setNameFilter}
                                setMinPrice={setMinPrice}
                                setMaxPrice={setMaxPrice}
                                setMinRating={setMinRating}
                                handleCategoryChange={handleCategoryChange}
                                clearFilters={() => {
                                    setNameFilter('');
                                    setMinPrice(undefined);
                                    setMaxPrice(undefined);
                                    setMinRating(undefined);
                                    setCategoryFilter(null);
                                }}
                            />
                        </GridCol>
                        <GridCol span={{md:9.5}}>
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
                                        <Grid.Col key={product.id} span={{base:6,md:4}}>
                                            <ProductCard product={product} />
                                        </Grid.Col>
                                    ))
                                )}
                            </Grid>
                            <Center>
                                <Pagination
                                    total={totalPages}
                                    value={currentPage}
                                    onChange={setCurrentPage}
                                    my="md"
                                />
                            </Center>
                        </GridCol>
                    </Grid>
                </Container>
            </MainLayout>
        </SvgPageBg>
    );
}

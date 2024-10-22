import React, {useEffect, useState} from 'react';
import {Box, Input, Loader, Paper, Text} from '@mantine/core';
import {IconSearch} from '@tabler/icons-react';
import {useSearchProducts} from "../../lib/api/product.api";
import ImgScaleWithBg from "../common/img-scale-with-bg.component";
import {buildProductUrl} from "../../utils/urlBuilder";
import {Link} from "react-router-dom";

export default function ProductSearch() {

    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

    const { data: products, isLoading, error } = useSearchProducts(debouncedSearchTerm);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    return (
        <Box className="relative w-full max-w-[400px]">
            <Input
                placeholder="Search products..."
                radius="md"
                rightSection={<IconSearch />}
                size="md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.currentTarget.value)}
                className="transition-colors duration-300"
            />

            {searchTerm && (
                <Paper
                    withBorder
                    className="absolute top-full left-0 right-0 mt-1 max-h-[300px] overflow-y-auto z-10"
                >
                    {isLoading && (
                        <Box p="md" className="text-center">
                            <Loader size="md" />
                        </Box>
                    )}

                    {error && (
                        <Box p="md">
                            <Text c="red">Error: {error.message}</Text>
                        </Box>
                    )}

                    {!isLoading && products && products.length > 0 && (
                        <Box p="md">
                            {products.map((product) => (
                                <Box
                                    component={Link}
                                    to={buildProductUrl(product.category, product.id, product.title)}
                                    key={product.id}
                                    className="flex items-center gap-4 p-2 cursor-pointer transition-colors duration-200 hover:bg-gray-100"
                                >
                                    <ImgScaleWithBg
                                        img={product.image}
                                        alt={product.title}
                                        className="relative h-[40px] aspect-square rounded-xl p-1"
                                    />
                                    <Box>
                                        <Text size="sm" fw={500}>
                                            {product.title}
                                        </Text>
                                        <Text size="xs" c="dimmed">
                                            {product.category}
                                        </Text>
                                        <Text size="sm" fw={600}>
                                            {product.price} USD
                                        </Text>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    )}

                    {!isLoading && products && products.length === 0 && (
                        <Box p="md">
                            <Text>No products found.</Text>
                        </Box>
                    )}
                </Paper>
            )}
        </Box>
    );
}

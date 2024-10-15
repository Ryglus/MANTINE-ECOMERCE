import React, {useEffect, useState} from 'react';
import {Box, Input, Loader, Paper, Text} from '@mantine/core';
import {IconSearch} from '@tabler/icons-react';
import {useSearchProducts} from "../lib/api/product.api";
import ImgScaleWithBg from "./img-scale-with-bg.component";
import {buildProductUrl} from "../utils/urlBuilder";
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
        <Box style={{ position: 'relative', width: '100%', maxWidth: 400 }}>
            <Input
                placeholder="Search products..."
                radius="md"
                rightSection={<IconSearch />}
                size="md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.currentTarget.value)}
                style={{ color: '#000', transition: 'background-color 0.3s' }}
            />

            {searchTerm && (
                <Paper
                    withBorder
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        maxHeight: '300px',
                        overflowY: 'auto',
                        zIndex: 10,
                        marginTop: '5px',
                    }}
                >
                    {isLoading && (
                        <Box p="md">
                            <Loader size="sm" />
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
                                    component={Link} to={buildProductUrl(product.category, product.id, product.title)}
                                    key={product.id}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '15px',
                                        padding: '10px',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.2s',
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                        },
                                    }}
                                >
                                    <ImgScaleWithBg
                                        img={product.image}
                                        alt={product.title}
                                        className="relative h-[40px] aspect-square rounded-xl p-1"
                                    />
                                    <Box >
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

import React, {useState} from 'react';
import {ActionIcon, Box, Button, Flex, Rating, Text, TextInput,} from '@mantine/core';
import {showNotification} from '@mantine/notifications';
import {IconCheck, IconEdit, IconPlus, IconTrash} from '@tabler/icons-react';
import {Product} from '../../lib/api/dto/product.dto';
import {useOrderData} from '../../lib/api/order.api';
import {DataTable} from 'mantine-datatable';
import ImgScaleWithBg from "../../components/common/img-scale-with-bg.component";
import ProductModal from "./_components/modals/dashboard-product-edit.modal";
import {NumberParam, StringParam, useQueryParams, withDefault} from 'use-query-params';
import {Link} from "../../router";

const PAGE_SIZE = 10;

export default function DashboardProductsPage() {
    const { productsQuery } = useOrderData();
    const [queryParams, setQueryParams] = useQueryParams({
        page: withDefault(NumberParam, 1),
        name: StringParam,
        minPrice: NumberParam,
        maxPrice: NumberParam,
        category: StringParam,
    });
    const { page, name, minPrice, maxPrice, category } = queryParams;

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProductData, setNewProductData] = useState<Product>({
        id: 0,
        title: '',
        price: 0,
        description: '',
        category: '',
        image: '',
        rating: {
            rate: 0,
            count: 0,
        },
    });

    if (productsQuery.isLoading) {
        return <div>Loading...</div>;
    }

    if (productsQuery.isError) {
        return <div>Failed to load data</div>;
    }

    const products: Product[] = productsQuery.data || [];

    const filteredProducts = products.filter(product => {
        const matchesName = name ? product.title.toLowerCase().includes(name.toLowerCase()) : true;
        const matchesCategory = category ? product.category === category : true;
        const matchesPrice = (minPrice == null || product.price >= minPrice) &&
            (maxPrice == null || product.price <= maxPrice);
        return matchesName && matchesCategory && matchesPrice;
    });

    const handleProductUpdate = (product: Product) => {
        setSelectedProduct(product);
        setNewProductData(product);
        setIsModalOpen(true);
    };

    const handleProductDelete = (productId: number) => {
        showNotification({
            title: 'Product Deleted',
            message: `Product ID: ${productId} has been deleted.`,
            color: 'red',
            icon: <IconTrash size={16} />,
        });
    };

    const handleProductSave = () => {
        if (selectedProduct) {
            showNotification({
                title: 'Product Updated',
                message: `Product "${newProductData.title}" has been updated.`,
                color: 'green',
                icon: <IconCheck size={16} />,
            });
        } else {
            showNotification({
                title: 'Product Created',
                message: `Product "${newProductData.title}" has been created.`,
                color: 'green',
                icon: <IconCheck size={16} />,
            });
        }
        setIsModalOpen(false);
    };

    const openCreateProductModal = () => {
        setSelectedProduct(null);
        setNewProductData({
            id: 0,
            title: '',
            price: 0,
            description: '',
            category: '',
            image: '',
            rating: {
                rate: 0,
                count: 0,
            },
        });
        setIsModalOpen(true);
    };

    const handleFilterChange = (filterName: string, value: string | number | null) => {
        setQueryParams({ [filterName]: value, page: 1 });
    };


    return (
        <div>
            <Flex mb="md" gap="md" direction="row" justify="space-between">
                <TextInput
                    label="Name"
                    value={name || ''}
                    onChange={(e) => handleFilterChange('name', e.currentTarget.value)}
                    placeholder="Filter by name"
                />
                <TextInput
                    label="Min Price"
                    type="number"
                    value={minPrice ?? ''}
                    onChange={(e) => handleFilterChange('minPrice', e.currentTarget.value ? parseFloat(e.currentTarget.value) : null)}
                    placeholder="Min price"
                />
                <TextInput
                    label="Max Price"
                    type="number"
                    value={maxPrice ?? ''}
                    onChange={(e) => handleFilterChange('maxPrice', e.currentTarget.value ? parseFloat(e.currentTarget.value) : null)}
                    placeholder="Max price"
                />
                <TextInput
                    label="Category"
                    value={category || ''}
                    onChange={(e) => handleFilterChange('category', e.currentTarget.value)}
                    placeholder="Filter by category"
                />
                <Button leftSection={<IconPlus />} onClick={openCreateProductModal}>
                    Add Product
                </Button>
            </Flex>

            <DataTable<Product>
                withTableBorder
                borderRadius="sm"
                withColumnBorders
                striped
                highlightOnHover
                minHeight={150}
                records={filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)}
                columns={[
                    {
                        accessor: 'image',
                        title: 'Image',
                        cellsClassName: "p-0",
                        render: (product: Product) => (
                            <Box component={Link}
                                 to={"/products/:category/:id/:slug?"}
                                 params={{
                                    id: (product.id).toString(),
                                    category: product.category
                                }}
                            >
                                <ImgScaleWithBg
                                    img={product.image}
                                    alt={product.title}
                                    className={"w-[65px] h-[85px]"}
                                />
                            </Box>
                        )
                    },
                    {
                        accessor: 'id',
                        title: 'ID',
                        cellsClassName: "text-center",
                    },
                    {
                        accessor: 'title',
                        title: 'Product Name',
                        render: (product: Product) => (
                            <Text size="sm" className={"line-clamp-2 h-[50%]"}>{product.title}</Text>
                        ),
                    },
                    {
                        accessor: 'price',
                        title: 'Price ($)',
                    },
                    {
                        accessor: 'description',
                        title: 'Description',
                        render: (product: Product) => (
                            <Text size="sm" className="line-clamp-2 h-[50%]">{product.description}</Text>
                        ),
                    },
                    {
                        accessor: 'category',
                        title: 'Category',
                    },
                    {
                        accessor: 'rating',
                        title: 'Rating',
                        render: (product: Product) => (
                            <Box>
                                <Rating value={product.rating.rate} readOnly />
                                <Text size="xs">{`${product.rating.count} reviews`}</Text>
                            </Box>
                        ),
                    },
                    {
                        accessor: 'actions',
                        title: 'Actions',
                        render: (product: Product) => (
                            <Flex gap="xs">
                                <ActionIcon
                                    size="sm"
                                    onClick={() => handleProductUpdate(product)}
                                ><IconEdit /></ActionIcon>

                                <ActionIcon
                                    size="sm"
                                    color="red"
                                    onClick={() => handleProductDelete(product.id)}
                                >
                                    <IconTrash />
                                </ActionIcon>
                            </Flex>
                        ),
                    },
                ]}
                page={page}
                totalRecords={filteredProducts.length}
                recordsPerPage={PAGE_SIZE}
                onPageChange={(newPage: number) => setQueryParams({ page: newPage })}
            />

            <ProductModal
                opened={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                productData={newProductData}
                setProductData={setNewProductData}
                onSave={handleProductSave}
                isEditing={!!selectedProduct}
            />
        </div>
    );
}

import {ActionIcon, Box, Flex, Group, Text, TextInput} from '@mantine/core';
import {showNotification} from '@mantine/notifications';
import {IconTrash} from '@tabler/icons-react';
import {useOrderData} from '../../lib/api/order.api';
import {DataTable} from 'mantine-datatable';
import {NumberParam, StringParam, useQueryParams, withDefault} from 'use-query-params';
import {Order} from '../../lib/api/dto/order.dto';
import {Product} from '../../lib/api/dto/product.dto';
import {User} from "../../lib/api/dto/account.dto";

const PAGE_SIZE = 10;

export default function DashboardOrdersPage() {
    const { ordersQuery, usersQuery, productsQuery } = useOrderData();

    const [queryParams, setQueryParams] = useQueryParams({
        page: withDefault(NumberParam, 1),
        orderId: NumberParam,
        user: StringParam,
        date: StringParam,
    });

    const { page, orderId, user, date } = queryParams;

    if (ordersQuery.isLoading || usersQuery.isLoading || productsQuery.isLoading) {
        return <div>Loading...</div>;
    }

    if (ordersQuery.isError || usersQuery.isError || productsQuery.isError) {
        return <div>Failed to load data</div>;
    }

    const orders: Order[] = ordersQuery.data || [];
    const users: User[] = usersQuery.data || [];
    const products: Product[] = productsQuery.data || [];

    const getUserNameById = (userId: number): string => {
        const user = users.find(u => u.id === userId);
        return user ? user.username : 'Unknown User';
    };

    const getProductDetailsById = (productId: number): string => {
        const product = products.find(p => p.id === productId);
        return product ? `${product.title} - $${product.price}` : 'Unknown Product';
    };

    const filteredOrders = orders.filter(order => {
        const matchesOrderId = orderId ? order.id === orderId : true;
        const matchesUser = user ? getUserNameById(order.userId).toLowerCase().includes(user.toLowerCase()) : true;
        const matchesDate = date ? order.date.startsWith(date) : true;
        return matchesOrderId && matchesUser && matchesDate;
    });

    const handleOrderDelete = (orderId: number) => {
        showNotification({
            title: 'Order Deleted',
            message: `Order ID: ${orderId} has been deleted.`,
            color: 'red',
            icon: <IconTrash size={16} />,
        });
    };


    const handleFilterChange = (filterName: string, value: string | number | null) => {
        setQueryParams({ [filterName]: value, page: 1 });
    };

    return (
        <div>
            <Group mb="md" gap="md" >
                <TextInput
                    label="Order ID"
                    value={orderId?.toString() || ''}
                    onChange={(e) => handleFilterChange('orderId', e.currentTarget.value ? parseInt(e.currentTarget.value) : null)}
                    placeholder="Filter by Order ID"
                />
                <TextInput
                    label="User"
                    value={user || ''}
                    onChange={(e) => handleFilterChange('user', e.currentTarget.value)}
                    placeholder="Filter by User"
                />
                <TextInput
                    label="Date"
                    value={date || ''}
                    onChange={(e) => handleFilterChange('date', e.currentTarget.value)}
                    placeholder="Filter by Date"
                />
            </Group>

            <DataTable<Order>
                withTableBorder
                borderRadius="sm"
                withColumnBorders
                striped
                highlightOnHover
                minHeight={150}
                records={filteredOrders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)}
                columns={[
                    {
                        accessor: 'id',
                        title: 'Order ID',
                        cellsClassName: "text-center",
                    },
                    {
                        accessor: 'userId',
                        title: 'User',
                        render: (order: Order) => (
                            <Text size="sm">{getUserNameById(order.userId)}</Text>
                        ),
                    },
                    {
                        accessor: 'date',
                        title: 'Date',
                        render: (order: Order) => (
                            <Text size="sm">{order.date}</Text>
                        ),
                    },
                    {
                        accessor: 'products',
                        title: 'Products',
                        render: (order: Order) => (
                            <Box>
                                {order.products.map((product) => (
                                    <Text key={product.productId} size="xs">
                                        {getProductDetailsById(product.productId)} - Quantity: {product.quantity}
                                    </Text>
                                ))}
                            </Box>
                        ),
                    },
                    {
                        accessor: 'actions',
                        title: 'Actions',
                        render: (order: Order) => (
                            <Flex gap="xs">
                                <ActionIcon
                                    size="sm"
                                    color="red"
                                    onClick={() => handleOrderDelete(order.id)}
                                >
                                    <IconTrash />
                                </ActionIcon>
                            </Flex>
                        ),
                    },
                ]}
                page={page}
                totalRecords={filteredOrders.length}
                recordsPerPage={PAGE_SIZE}
                onPageChange={(newPage: number) => setQueryParams({ page: newPage })}
                noRecordsText=""
                emptyState={<div className="!h-0 !p-0"></div>}
            />
        </div>
    );
}

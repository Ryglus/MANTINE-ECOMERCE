import React, {useEffect, useState} from 'react';
import {ActionIcon, Box, Button, Flex, Stack, Text} from '@mantine/core';
import {DatePicker, type DatesRangeValue} from '@mantine/dates';
// @ts-ignore
import sortBy from 'lodash/sortBy';
import {showNotification} from '@mantine/notifications';
import {IconChevronUp, IconSelector, IconTrash} from '@tabler/icons-react';
import {useOrderData} from '../../lib/api/order.api';
import {DataTable, DataTableSortStatus} from 'mantine-datatable';
import {DateParam, NumberParam, StringParam, useQueryParams, withDefault} from 'use-query-params';
import {Order} from '../../lib/api/dto/order.dto';
import {Product} from '../../lib/api/dto/product.dto';
import {User} from "../../lib/api/dto/account.dto";
import dayjs from 'dayjs';

const PAGE_SIZE = 10;

export default function DashboardOrdersPage() {
    const { ordersQuery, usersQuery, productsQuery } = useOrderData();

    const [queryParams, setQueryParams] = useQueryParams({
        page: withDefault(NumberParam, 1),
        orderId: NumberParam,
        user: StringParam,
        fromDate: DateParam,
        toDate: DateParam,
        sC: withDefault(StringParam, 'id'),
        sD: withDefault(StringParam, 'asc'),
    });

    const { page, orderId, user, fromDate, toDate, sC, sD } = queryParams;

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Order>>({
        columnAccessor: sC || 'id',
        direction: sD as 'asc' | 'desc',
    });

    const [sortedOrders, setSortedOrders] = useState<Order[]>([]);
    const [dateRange, setDateRange] = useState<DatesRangeValue>(fromDate && toDate ? [new Date(fromDate), new Date(toDate)] : [null, null]);

    useEffect(() => {
        if (ordersQuery.isSuccess) {
            const filteredOrders = ordersQuery.data.filter(order => {
                const matchesOrderId = orderId ? order.id === orderId : true;
                const matchesUser = user
                    ? getUserNameById(order.userId).toLowerCase().includes(user.toLowerCase())
                    : true;

                const matchesDateRange = dateRange && dateRange[0] && dateRange[1]
                    ? dayjs(order.date).isAfter(dayjs(dateRange[0])) && dayjs(order.date).isBefore(dayjs(dateRange[1]))
                    : true;

                return matchesOrderId && matchesUser && matchesDateRange;
            });

            let sortedData;
            if (sortStatus.columnAccessor === 'date') {
                sortedData = sortBy(filteredOrders, (order: { date: string | number | Date; }) => new Date(order.date));
            } else {
                sortedData = sortBy(filteredOrders, sortStatus.columnAccessor);
            }

            setSortedOrders(sortStatus.direction === 'desc' ? sortedData.reverse() : sortedData);
        }
    }, [ordersQuery.data, orderId, user, dateRange, sortStatus]);

    useEffect(() => {
        setQueryParams({
            sC: sortStatus.columnAccessor,
            sD: sortStatus.direction,
        });
    }, [sortStatus]);

    useEffect(() => {
        if (dateRange && dateRange[0] && dateRange[1]) {
            setQueryParams({
                fromDate: dayjs(dateRange[0]).toDate(),
                toDate: dayjs(dateRange[1]).toDate(),
            });
        } else {
            setQueryParams({
                fromDate: undefined,
                toDate: undefined,
            });
        }
    }, [dateRange]);

    if (ordersQuery.isLoading || usersQuery.isLoading || productsQuery.isLoading) {
        return <div>Loading...</div>;
    }

    if (ordersQuery.isError || usersQuery.isError || productsQuery.isError) {
        return <div>Failed to load data</div>;
    }

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

    const handleOrderDelete = (orderId: number) => {
        showNotification({
            title: 'Order Deleted',
            message: `Order ID: ${orderId} has been deleted.`,
            color: 'red',
            icon: <IconTrash size={16} />,
        });
    };

    return (
        <div>
            <DataTable<Order>
                withTableBorder
                borderRadius="sm"
                withColumnBorders
                striped
                highlightOnHover
                minHeight={150}
                records={sortedOrders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)}
                columns={[
                    {
                        accessor: 'id',
                        title: 'Order ID',
                        sortable: true,
                        render: (order: Order) => (
                            <Text>{order.id}</Text>
                        ),
                    },
                    {
                        accessor: 'userId',
                        title: 'User',
                        sortable: true,
                        render: (order: Order) => (
                            <Text>{getUserNameById(order.userId)}</Text>
                        ),
                    },
                    {
                        accessor: 'date',
                        title: 'Date',
                        sortable: true,
                        render: (order: Order) => (
                            <Text>{new Date(order.date).toLocaleString()}</Text>
                        ),
                        filter: ({ close }) => (
                            <Stack>
                                <DatePicker
                                    maxDate={new Date()}
                                    type="range"
                                    value={dateRange}
                                    onChange={setDateRange}
                                />
                                <Button
                                    disabled={!dateRange}
                                    variant="light"
                                    onClick={() => {
                                        setDateRange([null, null]);
                                        close();
                                    }}
                                >
                                    Clear
                                </Button>
                            </Stack>
                        ),
                        filtering: Boolean(dateRange),
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
                        title: '',
                        render: (order: Order) => (
                            <Flex>
                                <ActionIcon size="sm" color="red" onClick={() => handleOrderDelete(order.id)}>
                                    <IconTrash />
                                </ActionIcon>
                            </Flex>
                        ),
                    },
                ]}
                sortStatus={sortStatus}
                onSortStatusChange={setSortStatus}
                sortIcons={{
                    sorted: <IconChevronUp size={14} />,
                    unsorted: <IconSelector size={14} />,
                }}
                page={page}
                totalRecords={sortedOrders.length}
                recordsPerPage={PAGE_SIZE}
                onPageChange={(newPage: number) => setQueryParams({ page: newPage })}
            />
        </div>
    );
}

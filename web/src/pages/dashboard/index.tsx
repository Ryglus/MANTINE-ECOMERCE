import React from 'react';
import {Center, Grid, Loader, Text} from '@mantine/core';
import {StatCard} from "./_components/_cards/stat.card";
import {LineChartCard} from "./_components/_cards/line-chart.card";
import {useOrderData} from "../../lib/api/order.api";
import {Product} from "../../lib/api/dto/product.dto";
// @ts-ignore
import {DateTime} from 'luxon';
import {IconUsers} from "@tabler/icons-react";

export default function DashboardIndexPage() {
    const { ordersQuery, usersQuery, productsQuery } = useOrderData();

    if (ordersQuery.isLoading || usersQuery.isLoading || productsQuery.isLoading) {
        return (
            <Center style={{ height: '100vh' }}>
                <Loader size="lg" />
            </Center>
        );
    }

    if (ordersQuery.isError || usersQuery.isError || productsQuery.isError) {
        return (
            <Center style={{ height: '100vh' }}>
                <Text c="red">Failed to load data. Please try again later.</Text>
            </Center>
        );
    }

    const products = productsQuery.data || [];
    const orders = ordersQuery.data || [];
    const users = usersQuery.data || [];

    const getProductPriceById = (id: number): number => {
        const product = products.find((p: Product) => p.id === id);
        return product ? product.price : 0;
    };


    const salesByDate: Record<string, number> = orders.reduce((acc: Record<string, number>, order) => {
        const formattedDate = DateTime.fromISO(order.date).toISODate();

        const totalSalesForOrder = order.products.reduce((sum, product) => {
            return sum + (getProductPriceById(product.productId) * product.quantity);
        }, 0);

        if (!acc[formattedDate]) {
            acc[formattedDate] = totalSalesForOrder;
        } else {
            acc[formattedDate] += totalSalesForOrder;
        }

        return acc;
    }, {});

    const salesData = Object.entries(salesByDate).map(([date, sales]) => ({
        date,
        Sales: sales,
    }));

    const totalSales = products.reduce((acc, product) => acc + product.price, 0);
    const ordersCount = orders.length;
    const customersCount = users.length;
    const lowInventoryCount = products.filter(product => product.rating.count < 5).length;

    //const topProducts = products.sort((a, b) => b.price - a.price).slice(0, 3);
/*
    const recentOrders = orders.slice(0, 3).map((order) => ({
        id: order.id.toString(),
        amount: order.products.reduce((acc, prod) => acc + prod.quantity, 0) * 100, // Example pricing
    }));
*/
    return (
        <Grid gutter="lg">
            <Grid.Col span={3}>
                <StatCard
                    title="New Customers"
                    value={lowInventoryCount.toString()}
                    percentageChange="+8% from last week"
                    icon={<IconUsers size={24} />}
                />
            </Grid.Col>
            <Grid.Col span={3}>
                <StatCard
                    title="New Customers"
                    value={ordersCount.toString()}
                    percentageChange="+8% from last week"
                    icon={<IconUsers size={24} />}
                />
            </Grid.Col>
            <Grid.Col span={3}>
                <StatCard
                    title="New Customers"
                    value={totalSales.toString()}
                    percentageChange="+8% from last week"
                    icon={<IconUsers size={24} />}
                />
            </Grid.Col>
            <Grid.Col span={3}>
                <StatCard
                    title="New Customers"
                    value={customersCount.toString()}
                    percentageChange="+8% from last week"
                    icon={<IconUsers size={24} />}
                />
            </Grid.Col>
            <Grid.Col span={12}>
                <LineChartCard data={salesData} />
            </Grid.Col>

        </Grid>
    );
}

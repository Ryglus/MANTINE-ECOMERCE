import React from 'react';
import {Divider, Flex, Text, Title} from '@mantine/core';
import {PieChart} from '@mantine/charts';
import {Product} from '../../../../lib/api/dto/product.dto';
import {Order} from '../../../../lib/api/dto/order.dto';
import {calculateCategoryDistribution} from '../../_utils/dashboard-data.utility';
import {CardActions} from '../card-actions.menu.component';
import {DashBoardTile} from './card.template';

const colors = ['#4caf50', '#ff9800', '#f44336', '#2196f3', '#9c27b0', '#ffeb3b'];

interface PieChartCardProps {
    orders: Order[];
    products: Product[];
    timeframe: string;
    setTimeframe: (value: string) => void;
    gridSize: { colSpan: number; rowSpan: number };
    onSizeSelect: (size: { colSpan: number; rowSpan: number }) => void;
}

export const PieChartCard: React.FC<PieChartCardProps> = ({
                                                              orders,
                                                              products,
                                                              timeframe,
                                                              setTimeframe,
                                                              gridSize,
                                                              onSizeSelect
                                                          }) => {
    const categoryData = calculateCategoryDistribution(orders, products, timeframe);

    const totalSales = categoryData.reduce((acc, { sales }) => acc + sales, 0);

    const pieData = categoryData.map(({ category, sales }) => ({
        label: category,
        value: ((sales / totalSales) * 100).toFixed(2),
    }));

    const handleSizeChange = (newSize: number) => {
        const rowSpan = newSize > 6 ? 2 : 1;
        onSizeSelect({ colSpan: newSize, rowSpan });
    };

    return (
        <DashBoardTile
            title={<Title order={4}>Category Disposition of Sold Products</Title>}
            actions={
                <CardActions
                    timeframe={timeframe}
                    onSelect={setTimeframe}
                    gridSize={gridSize.colSpan}
                    onSizeSelect={handleSizeChange}
                />
            }
        >
            <PieChart
                data={pieData.map(({ label, value }, index) => ({
                    name: `${label}`,
                    value: parseFloat(value),
                    color: colors[index % colors.length],
                }))}
                withTooltip
                tooltipDataSource="segment"
                mx="auto"
                my="lg"
            />
            <Divider my="sm" />
            {pieData.map(({ label, value }, index) => (
                <Flex key={index} justify="space-between">
                    <Text>{label}</Text>
                    <Text>{value}%</Text>
                </Flex>
            ))}
        </DashBoardTile>
    );
};

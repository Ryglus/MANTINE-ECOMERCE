import React from 'react';
import {Divider, Flex, Text} from '@mantine/core';
import {PieChart} from '@mantine/charts';
import {calculateCategoryDistribution} from '../../_utils/dashboard-data.utility';
import {Order} from "../../../../lib/api/dto/order.dto";
import {Product} from "../../../../lib/api/dto/product.dto";

interface PieChartCardProps {
    orders: Order[];
    products: Product[];
    timeframe: string;
}

const colors = ['#4caf50', '#ff9800', '#f44336', '#2196f3', '#9c27b0', '#ffeb3b'];
export default function PieChartWidget(
    {
        orders,
        products,
        timeframe,
    }: PieChartCardProps) {

    const categoryData = calculateCategoryDistribution(orders, products, timeframe);

    const totalSales = categoryData.reduce((acc, { sales }) => acc + sales, 0);

    const pieData = categoryData.map(({ category, sales }) => ({
        label: category,
        value: ((sales / totalSales) * 100).toFixed(2),
    }));

    return (
      <>
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
      </>
    );
};

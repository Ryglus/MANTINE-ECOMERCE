import React, {useState} from 'react';
import {Divider, Flex, Group, Paper, SegmentedControl, Select, Title} from '@mantine/core';
import {BarChart, LineChart} from '@mantine/charts';
// @ts-expect-error
import {DateTime} from 'luxon';
import {IconChartBarPopular, IconTimeline} from "@tabler/icons-react";

interface LineChartCardProps {
    data: { date: string, Sales: number }[];
}

const groupDataByTimeUnit = (data: { date: string, Sales: number }[], unit: 'year' | 'month' | 'week' | 'day') => {
    return data.reduce((acc: Record<string, number>, item) => {
        const formattedDate = DateTime.fromISO(item.date).startOf(unit).toFormat(unit === 'year' ? 'yyyy' : unit === 'month' ? 'MMMM yyyy' : 'DD');
        if (!acc[formattedDate]) {
            acc[formattedDate] = item.Sales;
        } else {
            acc[formattedDate] += item.Sales;
        }
        return acc;
    }, {});
};

export const LineChartCard: React.FC<LineChartCardProps> = ({ data }) => {
    const [timeframe, setTimeframe] = useState<string>('all_time');
    const [grouping, setGrouping] = useState<string>('day');
    const [chartType, setChartType] = useState<string>('bar');

    const filterDataByTimeframe = (timeframe: string) => {
        const now = DateTime.now();
        switch (timeframe) {
            case 'this_year':
                return data.filter(item =>
                    DateTime.fromISO(item.date).hasSame(now, 'year')
                );
            case 'last_year':
                return data.filter(item =>
                    DateTime.fromISO(item.date).hasSame(now.minus({ years: 1 }), 'year')
                );
            case 'last_30_days':
                return data.filter(item =>
                    DateTime.fromISO(item.date) >= now.minus({ days: 30 })
                );
            case 'last_90_days':
                return data.filter(item =>
                    DateTime.fromISO(item.date) >= now.minus({ days: 90 })
                );
            case 'last_6_months':
                return data.filter(item =>
                    DateTime.fromISO(item.date) >= now.minus({ months: 6 })
                );
            case 'all_time':
            default:
                return data;
        }
    };

    const applyGrouping = (data: { date: string, Sales: number }[], grouping: string) => {
        const groupedData = groupDataByTimeUnit(data, grouping as 'year' | 'month' | 'week' | 'day');

        return Object.entries(groupedData).map(([date, sales]) => ({
            date,
            Sales: sales,
        }));
    };

    const filteredData = filterDataByTimeframe(timeframe);
    const groupedData = applyGrouping(filteredData, grouping);

    return (
        <Paper shadow="md" radius={"md"}>
            <Flex justify={"space-between"}>
                <Group gap="sm" px={"md"}>
                    <Title order={4}>Sales Over Time</Title>




                </Group>
                <Group gap="sm" px={"md"}>
                    <Select
                        label="Select Timeframe"
                        value={timeframe}
                        onChange={(value) => setTimeframe(value || 'all_time')}
                        data={[
                            { value: 'all_time', label: 'All Time' },
                            { value: 'this_year', label: 'This Year' },
                            { value: 'last_year', label: 'Last Year' },
                            { value: 'last_30_days', label: 'Last 30 Days' },
                            { value: 'last_90_days', label: 'Last 90 Days' },
                            { value: 'last_6_months', label: 'Last 6 Months' },
                        ]}
                        clearable={false}
                    />

                    <Select
                        label="Group By"
                        value={grouping}
                        onChange={(value) => setGrouping(value || 'day')}
                        data={[
                            { value: 'year', label: 'Year' },
                            { value: 'month', label: 'Month' },
                            { value: 'week', label: 'Week' },
                            { value: 'day', label: 'Day' },
                        ]}
                        clearable={false}
                    />
                    <SegmentedControl
                        data={[
                            { value: 'bar', label: <IconChartBarPopular/> },
                            { value: 'line', label: <IconTimeline/> },
                        ]}
                        size={"sm"}
                        defaultValue={chartType}
                        onChange={setChartType}
                    />
                </Group>
            </Flex>

            <Divider my={5} />
                {chartType === 'line' ? (
                    <LineChart
                        px={"sm"}
                        h={300}
                        data={groupedData}
                        dataKey="date"
                        xAxisLabel="date"
                        yAxisLabel="Sales"
                        series={[{ name: 'Sales', color: 'bg' }]}
                        curveType="linear"
                        withLegend
                        valueFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                ) : (
                    <BarChart
                        px={"sm"}
                        h={300}
                        data={groupedData}
                        dataKey="date"
                        xAxisLabel="date"
                        yAxisLabel="Sales"
                        series={[{ name: 'Sales', color: 'bg' }]}
                        withLegend
                        valueFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                )}

        </Paper>
    );
};

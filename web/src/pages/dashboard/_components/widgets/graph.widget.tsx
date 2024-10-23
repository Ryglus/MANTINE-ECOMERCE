import React, {useEffect, useState} from 'react';
import {Menu, SegmentedControl} from '@mantine/core';
import {BarChart, LineChart} from '@mantine/charts';
import {IconChartBarPopular, IconCheck, IconTimeline} from '@tabler/icons-react';
import {groupDataByTimeUnit} from '../../_utils/dashboard-date.utility';
import {ItemProps, useDashboardStore} from "../../../../store/dashboard-store";

interface LineChartCardProps {
    item: ItemProps;
    data: { date: string; Sales: number }[];
    returnActions?: (value: React.ReactNode) => void;
    returnMenuOptions?: (value: React.ReactNode) => void;
}

export default function GraphWidget(
    {
        item,
        data,
        returnActions,
        returnMenuOptions,
    }: LineChartCardProps) {
    const [grouping, setGrouping] = useState(item.groupBy || 'day');
    const [chartType, setChartType] = useState('bar');
    const { setGroupBy } = useDashboardStore();
    const onGroupBySelect = (newGroupBy: string) => {
        setGroupBy(item.id, newGroupBy);
        setGrouping(newGroupBy);
    };

    const applyGrouping = (
        data: { date: string; Sales: number }[],
        grouping: string
    ) => {
        const groupedData = groupDataByTimeUnit(
            data,
            grouping as 'year' | 'month' | 'week' | 'day'
        );
        return Object.entries(groupedData)
            .map(([date, sales]) => ({ date, Sales: sales }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    };

    const groupedData = applyGrouping(data, grouping);

    useEffect(() => {
        if (returnActions) {
            returnActions(
                <SegmentedControl
                    data={[
                        {value: 'bar', label: <IconChartBarPopular/>},
                        {value: 'line', label: <IconTimeline/>},
                    ]}
                    size="xs"
                    value={chartType}
                    onChange={setChartType}
                />
            )
        }

        if (returnMenuOptions) {
            returnMenuOptions(
                <>
                    <Menu.Label>Group By</Menu.Label>
                    <Menu.Item onClick={() => onGroupBySelect('year')}
                               rightSection={grouping === 'year' ? <IconCheck size={14}/> : null}>
                        Year
                    </Menu.Item>
                    <Menu.Item onClick={() => onGroupBySelect('month')}
                               rightSection={grouping === 'month' ? <IconCheck size={14}/> : null}>
                        Month
                    </Menu.Item>
                    <Menu.Item onClick={() => onGroupBySelect('week')}
                               rightSection={grouping === 'week' ? <IconCheck size={14}/> : null}>
                        Week
                    </Menu.Item>
                    <Menu.Item onClick={() => onGroupBySelect('day')}
                               rightSection={grouping === 'day' ? <IconCheck size={14}/> : null}>
                        Day
                    </Menu.Item>
                </>
            )
        }
    }, [grouping,chartType]);

    return (
        <>
            {chartType === 'line' ? (
                <LineChart
                    p="sm"
                    className={"h-full"}
                    data={groupedData}
                    dataKey="date"
                    xAxisLabel="Date"
                    yAxisLabel="Sales"
                    series={[{ name: 'Sales', color: 'bg' }]}
                    curveType="linear"
                    withLegend
                    valueFormatter={(value) => `$${value.toLocaleString()}`}
                />
            ) : (
                <BarChart
                    p="sm"
                    className={"h-full"}
                    data={groupedData}
                    dataKey="date"
                    xAxisLabel="Date"
                    yAxisLabel="Sales"
                    series={[{ name: 'Sales', color: 'bg' }]}
                    withLegend
                    valueFormatter={(value) => `$${value.toLocaleString()}`}
                />
            )}
        </>
    );
}

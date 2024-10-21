import React, {useState} from 'react';
import {Menu, SegmentedControl, Title} from '@mantine/core';
import {BarChart, LineChart} from '@mantine/charts';
import {IconChartBarPopular, IconCheck, IconTimeline} from '@tabler/icons-react';
import {groupDataByTimeUnit} from '../../_utils/dashboard-date.utility';
import {DashBoardTile} from './card.template';
import {CardActions} from '../card-actions.menu.component';

interface LineChartCardProps {
    data: { date: string; Sales: number }[];
    timeframe: string;
    setTimeframe: (value: string) => void;
    gridSize: { colSpan: number; rowSpan: number };
    onSizeSelect: (size: { colSpan: number; rowSpan: number }) => void;
}

export const GraphCard: React.FC<LineChartCardProps> = ({
                                                            data,
                                                            timeframe,
                                                            setTimeframe,
                                                            gridSize,
                                                            onSizeSelect,
                                                        }) => {
    const [grouping, setGrouping] = useState<string>('day');
    const [chartType, setChartType] = useState<string>('bar');

    const applyGrouping = (data: { date: string; Sales: number }[], grouping: string) => {
        const groupedData = groupDataByTimeUnit(data, grouping as 'year' | 'month' | 'week' | 'day');

        return Object.entries(groupedData)
            .map(([date, sales]) => ({ date, Sales: sales }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    };

    const groupedData = applyGrouping(data, grouping);

    const handleSizeChange = (newSize: number) => {
        const rowSpan = newSize > 6 ? 2 : 1;
        onSizeSelect({ colSpan: newSize, rowSpan });
    };

    return (
        <DashBoardTile
            title={<Title order={4}>Sales Over Time</Title>}
            actions={
                <>
                    <SegmentedControl
                        data={[
                            { value: 'bar', label: <IconChartBarPopular /> },
                            { value: 'line', label: <IconTimeline /> },
                        ]}
                        size="xs"
                        value={chartType}
                        onChange={setChartType}
                    />
                    <CardActions
                        timeframe={timeframe}
                        onSelect={setTimeframe}
                        gridSize={gridSize.colSpan}
                        onSizeSelect={handleSizeChange}
                    >
                        <Menu.Label>Group By</Menu.Label>
                        <Menu.Item
                            onClick={() => setGrouping('year')}
                            rightSection={grouping === 'year' ? <IconCheck size={14} /> : null}
                        >
                            Year
                        </Menu.Item>
                        <Menu.Item
                            onClick={() => setGrouping('month')}
                            rightSection={grouping === 'month' ? <IconCheck size={14} /> : null}
                        >
                            Month
                        </Menu.Item>
                        <Menu.Item
                            onClick={() => setGrouping('week')}
                            rightSection={grouping === 'week' ? <IconCheck size={14} /> : null}
                        >
                            Week
                        </Menu.Item>
                        <Menu.Item
                            onClick={() => setGrouping('day')}
                            rightSection={grouping === 'day' ? <IconCheck size={14} /> : null}
                        >
                            Day
                        </Menu.Item>
                    </CardActions>
                </>
            }
        >
            {chartType === 'line' ? (
                <LineChart
                    px="sm"
                    h={300}
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
                    px="sm"
                    h={300}
                    data={groupedData}
                    dataKey="date"
                    xAxisLabel="Date"
                    yAxisLabel="Sales"
                    series={[{ name: 'Sales', color: 'bg' }]}
                    withLegend
                    valueFormatter={(value) => `$${value.toLocaleString()}`}
                />
            )}
        </DashBoardTile>
    );
};

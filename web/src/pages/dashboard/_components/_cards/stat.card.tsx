import React from 'react';
import {Flex, Group, Text} from '@mantine/core';
import {IconClock} from '@tabler/icons-react';
import {getPreviousTimeframe, labelByTimeframe} from '../../_utils/dashboard-date.utility';
import {DashBoardTile} from './card.template';
import {CardActions} from '../card-actions.menu.component';

interface StatCardProps {
    title: string;
    value: number;
    prevValue: number;
    icon: React.ReactNode;
    timeframe: string;
    setTimeframe: (value: string) => void;
    gridSize: { colSpan: number; rowSpan: number };
    onSizeSelect: (size: { colSpan: number; rowSpan: number }) => void;
}

export const StatCard: React.FC<StatCardProps> = ({
                                                      title,
                                                      value,
                                                      prevValue,
                                                      icon,
                                                      timeframe,
                                                      setTimeframe,
                                                      gridSize,
                                                      onSizeSelect,
                                                  }) => {
    const percentageChange = prevValue !== 0
        ? (((value - prevValue) / prevValue) * 100).toFixed(2) + '%'
        : 'N/A';

    const isPositive = value > prevValue;
    const isNeutral = value === prevValue;

    const handleSizeChange = (newSize: number) => {
        const rowSpan = newSize > 6 ? 2 : 1;
        onSizeSelect({ colSpan: newSize, rowSpan });
    };

    return (
        <DashBoardTile
            title={<Flex gap={'xs'}>{icon} {title}</Flex>}
            actions={
                <CardActions
                    timeframe={timeframe}
                    onSelect={setTimeframe}
                    gridSize={gridSize.colSpan}
                    onSizeSelect={handleSizeChange}
                />
            }
        >
            <Text size="xl" fw={700} mt="md">{value}</Text>
            <Flex justify="space-between" mt="md">
                <Group gap="xs">
                    {isNeutral ? (
                        <Text>Comparing to historical data</Text>
                    ) : (
                        <Text c={isNeutral ? 'gray' : isPositive ? 'green' : 'red'}>
                            {percentageChange} from {labelByTimeframe(getPreviousTimeframe(timeframe))}
                        </Text>
                    )}
                </Group>
                <Group gap="xs">
                    <IconClock size={14} />
                    {labelByTimeframe(timeframe)}
                </Group>
            </Flex>
        </DashBoardTile>
    );
};

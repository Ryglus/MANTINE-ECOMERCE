import React from 'react';
import {Flex, Group, Text} from '@mantine/core';
import {IconClock} from '@tabler/icons-react';
import {getPreviousTimeframe, labelByTimeframe} from '../../_utils/dashboard-date.utility';

interface StatCardProps {
    title: string;
    value: number;
    prevValue: number;
    icon: React.ReactNode;
    timeframe: string;
}

export default function StatWidget(
    {
        value,
        prevValue,
        timeframe,
    }: StatCardProps) {
    const percentageChange = prevValue !== 0
        ? (((value - prevValue) / prevValue) * 100).toFixed(2) + '%'
        : 'N/A';

    const isPositive = value > prevValue;
    const isNeutral = value == prevValue;

    return (
        <>
            <Text size="xl" fw={700} mt="md">{value}</Text>
            <Flex justify="space-between" mt="md">
                <Group gap="xs">
                    <Text c={isNeutral ? 'gray' : isPositive ? 'green' : 'red'}>
                        {isNeutral ? percentageChange : "-"} from {labelByTimeframe(getPreviousTimeframe(timeframe))}
                    </Text>
                </Group>
                <Group gap="xs">
                    <IconClock size={14} />
                    {labelByTimeframe(timeframe)}
                </Group>
            </Flex>
        </>
    );
};

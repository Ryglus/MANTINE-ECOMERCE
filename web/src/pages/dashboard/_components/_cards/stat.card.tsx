import React from 'react';
import {Card, Group, Text} from '@mantine/core';
import {IconArrowUpRight} from '@tabler/icons-react';

interface StatCardProps {
    title: string;
    value: string;
    percentageChange: string;
    isPositive?: boolean;
    icon: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, percentageChange, isPositive = true, icon }) => {
    return (
        <Card shadow="md" p="lg">
            <Group gap="apart">
                <Text fw={700} size="lg">{title}</Text>
                {icon}
            </Group>
            <Text size="xl" fw={700} mt="md">{value}</Text>
            <Group gap="xs" mt="md">
                <IconArrowUpRight size={16} color={isPositive ? "green" : "red"} />
                <Text c={isPositive ? "green" : "red"}>{percentageChange}</Text>
            </Group>
        </Card>
    );
};

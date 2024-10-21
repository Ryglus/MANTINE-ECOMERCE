import React from 'react';
import {Divider, Flex, Group, Paper} from '@mantine/core';


interface DashBoardTileProps {
    title: React.ReactNode;
    actions?: React.ReactNode;
    children: React.ReactNode;
    controls?: React.ReactNode;
}

export const DashBoardTile: React.FC<DashBoardTileProps> = ({ title, actions, children, controls }) => {
    return (
        <Paper shadow="md" radius="md" p="lg">
            <Flex justify="space-between">
                <Group gap="sm">
                    {title}
                </Group>
                <Group gap="sm">
                    {actions}
                </Group>
            </Flex>

            {controls && (
                <Group gap="sm" mt="md">
                    {controls}
                </Group>
            )}

            <Divider my={5} />
            {children}
        </Paper>
    );
};

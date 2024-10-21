import React from 'react';
import {ActionIcon, Box, Group, Menu, Text} from '@mantine/core';
import {IconCalendar, IconCheck, IconChevronDown, IconClock} from '@tabler/icons-react';
import {timeframes} from '../_utils/dashboard-date.utility';

interface CardActionsProps {
    timeframe: string;
    onSelect: (value: string) => void;
    onSizeSelect: (size: number) => void;
    children?: React.ReactNode;
    gridSize?: number;
}

const sizes = [3, 4, 6, 8, 9, 12];

export const CardActions: React.FC<CardActionsProps> = ({ timeframe, onSelect, onSizeSelect, children, gridSize }) => {
    return (
        <Menu shadow="md" width={200} withArrow>
            <Menu.Target>
                <ActionIcon>
                    <IconChevronDown size={20} />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>Select Timeframe</Menu.Label>
                {timeframes.map(({ key, label }) => (
                    <Menu.Item
                        key={key}
                        leftSection={key === 'last_24_hours' ? <IconClock size={14} /> : <IconCalendar size={14} />}
                        onClick={() => onSelect(key)}
                        rightSection={timeframe === key ? <IconCheck size={14} /> : null}
                    >
                        {label}
                    </Menu.Item>
                ))}

                {children && (
                    <>
                        <Menu.Divider />
                        {children}
                    </>
                )}

                <Menu.Divider />

                <Menu.Label>Select Grid Size</Menu.Label>
                <Group gap="xs" px="xs">
                    {sizes.map((size) => (
                        <Box
                            key={size}
                            style={(theme) => ({
                                width: 30,
                                height: 30,
                                borderRadius: 4,
                                backgroundColor: gridSize === size ? theme.colors.blue[6] : theme.colors.gray[2],
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s',
                                '&:hover': {
                                    backgroundColor: theme.colors.blue[5],
                                },
                            })}
                            onClick={() => onSizeSelect(size)}
                        >
                            <Text size="sm" c={gridSize === size ? 'white' : 'dark'}>
                                {size}
                            </Text>
                        </Box>
                    ))}
                </Group>
            </Menu.Dropdown>
        </Menu>
    );
};

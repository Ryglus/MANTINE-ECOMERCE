import React, {useState} from 'react';
import {ActionIcon, Divider, Flex, Group, Menu, Paper} from '@mantine/core';
import {ItemProps, useDashboardStore} from '../../../store/dashboard-store';
import {IconCalendar, IconCheck, IconChevronDown, IconClock} from '@tabler/icons-react';
import {timeframes} from '../_utils/dashboard-date.utility';
import WidgetController from './widget-controller.component';

interface WidgetCardProps {
    item: ItemProps;
}

export default function WidgetCard({ item }: WidgetCardProps) {
    const { setTimeFrame } = useDashboardStore();
    const [actionContent, setActionContent] = useState<React.ReactNode>(null);
    const [menuOptionContent, setMenuOptionContent] = useState<React.ReactNode>(null);

    const onTimeframeSelect = (newTimeFrame: string) => {
        setTimeFrame(item.id, newTimeFrame);
    };

    const returnActions = (render: React.ReactNode) => {
        setActionContent(render);
    };

    const returnMenuOptions = (render: React.ReactNode) => {
        setMenuOptionContent(render);
    };

    const menuOptions = (render?: React.ReactNode) => {
        return (
            <Menu>
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
                            onClick={() => onTimeframeSelect(key)}
                            rightSection={item.timeFrame === key ? <IconCheck size={14} /> : null}
                        >
                            {label}
                        </Menu.Item>
                    ))}
                    {render && (
                        <>
                            <Menu.Divider />
                            {render}
                        </>
                    )}
                </Menu.Dropdown>
            </Menu>
        );
    };

    return (
        <Paper shadow="md" radius="md" p="lg" bg="bg.9" className="w-full h-full overflow-hidden border">
            <Flex justify="space-between">
                <Group gap="sm">
                    {item.title}
                </Group>
                <Group gap="sm">
                    <div>{actionContent}</div>
                    {menuOptions(menuOptionContent)}
                </Group>
            </Flex>

            <Divider my={5} />
            <WidgetController
                item={item}
                returnActions={returnActions}
                returnMenuOptions={returnMenuOptions}
            />
        </Paper>
    );
}

import {Card, Divider, Grid, Group, Stack, Text, Title} from '@mantine/core';
import {IconArrowUpRight, IconBox, IconPackage, IconShoppingCart, IconTrendingUp, IconUsers} from '@tabler/icons-react';
import {LineChart} from "@mantine/charts";

const salesData = [
    { date: 'Mar 22', sales: 1000 },
    { date: 'Mar 23', sales: 1500 },
    { date: 'Mar 24', sales: 1200 },
    { date: 'Mar 25', sales: 2000 },
    { date: 'Mar 26', sales: 1800 },
];

export default function DashboardIndexPage() {
    return (
        <div style={{ padding: '20px' }}>
            <Title order={2} mb="lg">
                Overview
            </Title>

            <Grid gutter="lg">
                <Grid.Col span={3}>
                    <Card shadow="md" p="lg">
                        <Group gap="apart">
                            <Text fw={700} size="lg">Total Sales</Text>
                            <IconTrendingUp size={24} />
                        </Group>
                        <Text size="xl" fw={700} mt="md">$12,345</Text>
                        <Group gap="xs" mt="md">
                            <IconArrowUpRight size={16} color="green" />
                            <Text c="green">+10% from last week</Text>
                        </Group>
                    </Card>
                </Grid.Col>

                {/* Orders Summary */}
                <Grid.Col span={3}>
                    <Card shadow="md" p="lg">
                        <Group gap="apart">
                            <Text fw={700} size="lg">Orders</Text>
                            <IconShoppingCart size={24} />
                        </Group>
                        <Text size="xl" fw={700} mt="md">1,234</Text>
                        <Group gap="xs" mt="md">
                            <IconArrowUpRight size={16} color="green" />
                            <Text c="green">+5% from last week</Text>
                        </Group>
                    </Card>
                </Grid.Col>

                {/* New Customers */}
                <Grid.Col span={3}>
                    <Card shadow="md" p="lg">
                        <Group gap="apart">
                            <Text fw={700} size="lg">New Customers</Text>
                            <IconUsers size={24} />
                        </Group>
                        <Text size="xl" fw={700} mt="md">345</Text>
                        <Group gap="xs" mt="md">
                            <IconArrowUpRight size={16} color="green" />
                            <Text color="green">+8% from last week</Text>
                        </Group>
                    </Card>
                </Grid.Col>

                {/* Inventory Summary */}
                <Grid.Col span={3}>
                    <Card shadow="md" p="lg">
                        <Group gap="apart">
                            <Text fw={700} size="lg">Low Inventory</Text>
                            <IconPackage size={24} />
                        </Group>
                        <Text size="xl" fw={700} mt="md">25 items</Text>
                        <Group gap="xs" mt="md">
                            <IconBox size={16} color="red" />
                            <Text color="red">Restock needed</Text>
                        </Group>
                    </Card>
                </Grid.Col>

                {/* Sales Chart */}
                <Grid.Col span={12}>
                    <Card shadow="md" p="lg">
                        <Title order={4}>Sales Over Time</Title>
                        <Divider my="sm" />
                        <LineChart
                            h={300}
                            data={salesData}
                            dataKey="date"
                            series={[{ name: 'Sales', label: 'Sales in USD', color: 'blue.6' }]}
                            yAxisProps={{ label: 'Sales', domain: [0, 3000] }}
                            xAxisProps={{ label: 'Date' }}
                            withLegend
                            withPointLabels
                            valueFormatter={(value) => `$${value.toLocaleString()}`}
                        />
                    </Card>
                </Grid.Col>

                {/* Top Products */}
                <Grid.Col span={6}>
                    <Card shadow="md" p="lg">
                        <Title order={4}>Top Products</Title>
                        <Divider my="sm" />
                        <Stack gap="sm">
                            <Group gap="apart">
                                <Text>Product A</Text>
                                <Text fw={700}>$5,000</Text>
                            </Group>
                            <Group gap="apart">
                                <Text>Product B</Text>
                                <Text fw={700}>$4,200</Text>
                            </Group>
                            <Group gap="apart">
                                <Text>Product C</Text>
                                <Text fw={700}>$3,800</Text>
                            </Group>
                        </Stack>
                    </Card>
                </Grid.Col>

                {/* Recent Orders */}
                <Grid.Col span={6}>
                    <Card shadow="md" p="lg">
                        <Title order={4}>Recent Orders</Title>
                        <Divider my="sm" />
                        <Stack gap="sm">
                            <Group gap="apart">
                                <Text>Order #12345</Text>
                                <Text fw={700}>$200</Text>
                            </Group>
                            <Group gap="apart">
                                <Text>Order #12346</Text>
                                <Text fw={700}>$150</Text>
                            </Group>
                            <Group gap="apart">
                                <Text>Order #12347</Text>
                                <Text fw={700}>$400</Text>
                            </Group>
                        </Stack>
                    </Card>
                </Grid.Col>
            </Grid>
        </div>
    );
}

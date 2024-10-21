import React, {useState} from 'react';
import {Center, Loader, Text} from '@mantine/core';
import {StatCard} from './_components/_cards/stat.card';
import {GraphCard} from './_components/_cards/graph.card';
import {PieChartCard} from './_components/_cards/pie.card';
import {useOrderData} from '../../lib/api/order.api';
import {IconUsers} from '@tabler/icons-react';
import {calculateSalesData, calculateTotals} from './_utils/dashboard-data.utility';
import {getPreviousTimeframe} from './_utils/dashboard-date.utility';
import {DragDropContext, Draggable, Droppable, DropResult} from '@hello-pangea/dnd';

const reorder = (list: string[], startIndex: number, endIndex: number): string[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export default function DashboardIndexPage() {
    const { ordersQuery, usersQuery, productsQuery } = useOrderData();

    const [inventoryTimeframe, setInventoryTimeframe] = useState<string>('all_time');
    const [ordersTimeframe, setOrdersTimeframe] = useState<string>('all_time');
    const [salesTimeframe, setSalesTimeframe] = useState<string>('all_time');
    const [customersTimeframe, setCustomersTimeframe] = useState<string>('all_time');
    const [chartTimeframe, setChartTimeframe] = useState<string>('all_time');
    const [categoryTimeframe, setCategoryTimeframe] = useState<string>('all_time');

    const [gridSizes, setGridSizes] = useState<Record<string, { colSpan: number; rowSpan: number }>>({
        lowInventory: { colSpan: 3, rowSpan: 1 },
        orders: { colSpan: 3, rowSpan: 1 },
        totalSales: { colSpan: 3, rowSpan: 1 },
        customers: { colSpan: 3, rowSpan: 1 },
        graph: { colSpan: 6, rowSpan: 2 },
        categoryPie: { colSpan: 3, rowSpan: 2 },
    });

    const [tileOrder, setTileOrder] = useState<string[]>([
        'lowInventory',
        'orders',
        'totalSales',
        'customers',
        'graph',
        'categoryPie',
    ]);

    if (ordersQuery.isLoading || usersQuery.isLoading || productsQuery.isLoading) {
        return (
            <Center style={{ height: '100vh' }}>
                <Loader size="lg" />
            </Center>
        );
    }

    if (ordersQuery.isError || usersQuery.isError || productsQuery.isError) {
        return (
            <Center style={{ height: '100vh' }}>
                <Text c="red">Failed to load data. Please try again later.</Text>
            </Center>
        );
    }

    const products = productsQuery.data || [];
    const orders = ordersQuery.data || [];
    const users = usersQuery.data || [];

    const { totalSales } = calculateTotals(products, orders, users, salesTimeframe);
    const { ordersCount } = calculateTotals(products, orders, users, ordersTimeframe);
    const { customersCount } = calculateTotals(products, orders, users, customersTimeframe);
    const { lowInventoryCount } = calculateTotals(products, orders, users, inventoryTimeframe);

    const { totalSales: prevTotalSales } = calculateTotals(products, orders, users, getPreviousTimeframe(salesTimeframe));
    const { ordersCount: prevOrdersCount } = calculateTotals(products, orders, users, getPreviousTimeframe(ordersTimeframe));
    const { customersCount: prevCustomersCount } = calculateTotals(products, orders, users, getPreviousTimeframe(customersTimeframe));
    const { lowInventoryCount: prevLowInventoryCount } = calculateTotals(products, orders, users, getPreviousTimeframe(inventoryTimeframe));

    const salesData = calculateSalesData(orders, products, chartTimeframe);

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }
        const reorderedTiles = reorder(tileOrder, source.index, destination.index);
        setTileOrder(reorderedTiles);
    };

    const onSizeSelect = (tileId: string, newSize: { colSpan: number; rowSpan: number }) => {
        setGridSizes((prev) => ({ ...prev, [tileId]: newSize }));
    };

    const renderTiles = (tileId: string) => {
        switch (tileId) {
            case 'lowInventory':
                return (
                    <StatCard
                        title="Low Inventory"
                        value={lowInventoryCount.toString()}
                        prevValue={prevLowInventoryCount}
                        icon={<IconUsers size={24} />}
                        timeframe={inventoryTimeframe}
                        setTimeframe={setInventoryTimeframe}
                        gridSize={gridSizes[tileId]}
                        onSizeSelect={(size) => onSizeSelect(tileId, size)}
                    />
                );
            case 'orders':
                return (
                    <StatCard
                        title="Orders"
                        value={ordersCount.toString()}
                        prevValue={prevOrdersCount}
                        icon={<IconUsers size={24} />}
                        timeframe={ordersTimeframe}
                        setTimeframe={setOrdersTimeframe}
                        gridSize={gridSizes[tileId]}
                        onSizeSelect={(size) => onSizeSelect(tileId, size)}
                    />
                );
            case 'totalSales':
                return (
                    <StatCard
                        title="Total Sales"
                        value={totalSales.toString()}
                        prevValue={prevTotalSales}
                        icon={<IconUsers size={24} />}
                        timeframe={salesTimeframe}
                        setTimeframe={setSalesTimeframe}
                        gridSize={gridSizes[tileId]}
                        onSizeSelect={(size) => onSizeSelect(tileId, size)}
                    />
                );
            case 'customers':
                return (
                    <StatCard
                        title="Customers"
                        value={customersCount.toString()}
                        prevValue={prevCustomersCount}
                        icon={<IconUsers size={24} />}
                        timeframe={customersTimeframe}
                        setTimeframe={setCustomersTimeframe}
                        gridSize={gridSizes[tileId]}
                        onSizeSelect={(size) => onSizeSelect(tileId, size)}
                    />
                );
            case 'graph':
                return (
                    <GraphCard
                        data={salesData}
                        timeframe={chartTimeframe}
                        setTimeframe={setChartTimeframe}
                        gridSize={gridSizes[tileId]}
                        onSizeSelect={(size) => onSizeSelect(tileId, size)}
                    />
                );
            case 'categoryPie':
                return (
                    <PieChartCard
                        orders={orders}
                        products={products}
                        timeframe={categoryTimeframe}
                        setTimeframe={setCategoryTimeframe}
                        gridSize={gridSizes[tileId]}
                        onSizeSelect={(size) => onSizeSelect(tileId, size)}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tiles">
                {(provided) => (
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(12, 1fr)',
                            gridTemplateRows: 'repeat(auto-fill, 160px)',
                            gap: '16px',
                        }}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {tileOrder.map((tileId, index) => (
                            <Draggable key={tileId} draggableId={tileId} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                            gridColumn: `span ${gridSizes[tileId].colSpan}`,
                                            gridRow: `span ${gridSizes[tileId].rowSpan}`,
                                            ...provided.draggableProps.style,
                                        }}
                                    >
                                        {renderTiles(tileId)}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

import React, {useMemo} from 'react';
import {Center, Loader, Text} from '@mantine/core';
import {GraphCard, PieChartCard, StatCard} from "./_components/cards";
import {useOrderData} from '../../lib/api/order.api';
import {IconUsers} from '@tabler/icons-react';
import {calculatePreviousTotals, calculateSalesData, calculateTotals} from './_utils/dashboard-data.utility';
import {DragDropContext, Draggable, Droppable, DropResult} from '@hello-pangea/dnd';
import {useDashboardStore} from '../../store/dashboard-store';
import {useMediaQuery} from '@mantine/hooks';

const reorder = (list: string[], startIndex: number, endIndex: number): string[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export default function DashboardIndexPage() {

    const isSmallScreen = useMediaQuery('(max-width: 768px)');

    const { ordersQuery, usersQuery, productsQuery } = useOrderData();
    const { tileOrder, gridSizes, timeframes, setTileOrder, setGridSize, setTimeframe } = useDashboardStore();

    const products = productsQuery.data || [];
    const orders = ordersQuery.data || [];
    const users = usersQuery.data || [];

    const lowInventoryTotals = useMemo(() => calculateTotals(products, orders, users, timeframes.lowInventory), [products, orders, users, timeframes.lowInventory]);
    const ordersTotals = useMemo(() => calculateTotals(products, orders, users, timeframes.orders), [products, orders, users, timeframes.orders]);
    const salesTotals = useMemo(() => calculateTotals(products, orders, users, timeframes.totalSales), [products, orders, users, timeframes.totalSales]);
    const customersTotals = useMemo(() => calculateTotals(products, orders, users, timeframes.customers), [products, orders, users, timeframes.customers]);

    const previousLowInventoryTotals = useMemo(() => calculatePreviousTotals(products, orders, users, timeframes.lowInventory), [products, orders, users, timeframes.lowInventory]);
    const previousOrdersTotals = useMemo(() => calculatePreviousTotals(products, orders, users, timeframes.orders), [products, orders, users, timeframes.orders]);
    const previousSalesTotals = useMemo(() => calculatePreviousTotals(products, orders, users, timeframes.totalSales), [products, orders, users, timeframes.totalSales]);
    const previousCustomersTotals = useMemo(() => calculatePreviousTotals(products, orders, users, timeframes.customers), [products, orders, users, timeframes.customers]);

    const salesData = useMemo(() => calculateSalesData(orders, products, timeframes.graph), [orders, products, timeframes.graph]);

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

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }
        const reorderedTiles = reorder(tileOrder, source.index, destination.index);
        setTileOrder(reorderedTiles);
    };

    const renderTiles = (tileId: string) => {
        switch (tileId) {
            case 'lowInventory':
                return (
                    <StatCard
                        title="Low Inventory"
                        value={lowInventoryTotals.lowInventoryCount.toString()}
                        prevValue={previousLowInventoryTotals.lowInventoryCount}
                        icon={<IconUsers size={24} />}
                        timeframe={timeframes[tileId]}
                        setTimeframe={(newTimeframe) => setTimeframe(tileId, newTimeframe)}
                        gridSize={gridSizes[tileId]}
                        onSizeSelect={(size) => setGridSize(tileId, size)}
                    />
                );
            case 'orders':
                return (
                    <StatCard
                        title="Orders"
                        value={ordersTotals.ordersCount.toString()}
                        prevValue={previousOrdersTotals.ordersCount}
                        icon={<IconUsers size={24} />}
                        timeframe={timeframes[tileId]}
                        setTimeframe={(newTimeframe) => setTimeframe(tileId, newTimeframe)}
                        gridSize={gridSizes[tileId]}
                        onSizeSelect={(size) => setGridSize(tileId, size)}
                    />
                );
            case 'totalSales':
                return (
                    <StatCard
                        title="Total Sales"
                        value={salesTotals.totalSales.toString()}
                        prevValue={previousSalesTotals.totalSales}
                        icon={<IconUsers size={24} />}
                        timeframe={timeframes[tileId]}
                        setTimeframe={(newTimeframe) => setTimeframe(tileId, newTimeframe)}
                        gridSize={gridSizes[tileId]}
                        onSizeSelect={(size) => setGridSize(tileId, size)}
                    />
                );
            case 'customers':
                return (
                    <StatCard
                        title="Customers"
                        value={customersTotals.customersCount.toString()}
                        prevValue={previousCustomersTotals.customersCount}
                        icon={<IconUsers size={24} />}
                        timeframe={timeframes[tileId]}
                        setTimeframe={(newTimeframe) => setTimeframe(tileId, newTimeframe)}
                        gridSize={gridSizes[tileId]}
                        onSizeSelect={(size) => setGridSize(tileId, size)}
                    />
                );
            case 'graph':
                return (
                    <GraphCard
                        data={salesData}
                        timeframe={timeframes[tileId]}
                        setTimeframe={(newTimeframe) => setTimeframe(tileId, newTimeframe)}
                        gridSize={gridSizes[tileId]}
                        onSizeSelect={(size) => setGridSize(tileId, size)}
                    />
                );
            case 'categoryPie':
                return (
                    <PieChartCard
                        orders={orders}
                        products={products}
                        timeframe={timeframes[tileId]}
                        setTimeframe={(newTimeframe) => setTimeframe(tileId, newTimeframe)}
                        gridSize={gridSizes[tileId]}
                        onSizeSelect={(size) => setGridSize(tileId, size)}
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
                            gridAutoRows: 'minmax(160px, auto)',
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
                                            gridColumn: isSmallScreen
                                                ? 'span 12'
                                                : `span ${gridSizes[tileId].colSpan}`,
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
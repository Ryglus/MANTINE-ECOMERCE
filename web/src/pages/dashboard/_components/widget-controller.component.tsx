import React, {useMemo} from 'react';
import {ItemProps} from '../../../store/dashboard-store';
import PieChartCard from "./widgets/pie-chart.widget";
import {useOrderData} from "../../../lib/api/order.api";
import {calculatePreviousTotals, calculateSalesData, calculateTotals} from "../_utils/dashboard-data.utility";
import {IconUsers} from "@tabler/icons-react";
import StatWidget from "./widgets/stat-card.widget";
import GraphWidget from "./widgets/graph.widget";

interface WidgetControllerProps {
    item: ItemProps;
    returnActions?: (value: React.ReactNode) => void;
    returnMenuOptions?: (value: React.ReactNode) => void;
}

export default function WidgetController(
    {
        item,
        returnActions,
        returnMenuOptions,
    }:WidgetControllerProps) {
    const { type, timeFrame } = item;
    const { ordersQuery, usersQuery, productsQuery } = useOrderData();

    const products = productsQuery.data || [];
    const orders = ordersQuery.data || [];
    const users = usersQuery.data || [];

    const lowInventoryTotals = useMemo(() => calculateTotals(products, orders, users, timeFrame), [products, orders, users, timeFrame]);
    const ordersTotals = useMemo(() => calculateTotals(products, orders, users, timeFrame), [products, orders, users, timeFrame]);
    const salesTotals = useMemo(() => calculateTotals(products, orders, users, timeFrame), [products, orders, users, timeFrame]);
    const customersTotals = useMemo(() => calculateTotals(products, orders, users, timeFrame), [products, orders, users, timeFrame]);

    const previousLowInventoryTotals = useMemo(() => calculatePreviousTotals(products, orders, users, timeFrame), [products, orders, users, timeFrame]);
    const previousOrdersTotals = useMemo(() => calculatePreviousTotals(products, orders, users, timeFrame), [products, orders, users, timeFrame]);
    const previousSalesTotals = useMemo(() => calculatePreviousTotals(products, orders, users, timeFrame), [products, orders, users, timeFrame]);
    const previousCustomersTotals = useMemo(() => calculatePreviousTotals(products, orders, users, timeFrame), [products, orders, users, timeFrame]);

    const salesData = useMemo(() => calculateSalesData(orders, products, timeFrame), [orders, products, timeFrame]);

    const returnedActions = (value?: React.ReactNode): void => {
        if (returnActions) {
            returnActions(value);
        }
    };

    const returnedMenuOptions = (value?: React.ReactNode): void => {
        if (returnMenuOptions) {
            returnMenuOptions(value);
        }
    };

    switch (type) {
        case 'lowInventory':
            return  <StatWidget
                title="Low Inventory"
                value={lowInventoryTotals.lowInventoryCount.toString()}
                prevValue={previousLowInventoryTotals.lowInventoryCount}
                icon={<IconUsers size={24} />}
                timeframe={timeFrame}
            />;
        case 'graph':
            return <GraphWidget item={item} data={salesData} returnActions={returnedActions} returnMenuOptions={returnedMenuOptions} />;
        case 'categoryPie':
            return <PieChartCard timeframe={timeFrame} orders={orders} products={products} />;
        default:
            return null;
    }
};

/*

case 'totalSales':
            return <TotalSalesWidget />;
        case 'customers':
            return <CustomersWidget />;
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
 */
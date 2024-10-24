import React, {useMemo} from 'react';
import {ItemProps} from '../../../store/dashboard-store';
import PieChartCard from './widgets/pie-chart.widget';
import {useOrderData} from '../../../lib/api/order.api';
import {calculatePreviousTotals, calculateSalesData, calculateTotals} from '../_utils/dashboard-data.utility';
import {IconUsers} from '@tabler/icons-react';
import StatWidget from './widgets/stat-card.widget';
import GraphWidget from './widgets/graph.widget';

interface WidgetControllerProps {
    item: ItemProps;
    returnActions?: (value: React.ReactNode) => void;
    returnMenuOptions?: (value: React.ReactNode) => void;
}

export default function WidgetController({
                                             item,
                                             returnActions,
                                             returnMenuOptions,
                                         }: WidgetControllerProps) {
    const { type, timeFrame } = item;
    const { ordersQuery, usersQuery, productsQuery } = useOrderData();

    const products = useMemo(() => productsQuery.data || [], [productsQuery.data]);
    const orders = useMemo(() => ordersQuery.data || [], [ordersQuery.data]);
    const users = useMemo(() => usersQuery.data || [], [usersQuery.data]);

    const totalsByTimeFrame = useMemo(() => {
        return {
            totals: calculateTotals(products, orders, users, timeFrame),
            previousTotals: calculatePreviousTotals(products, orders, users, timeFrame),
        };
    }, [products, orders, users, timeFrame]);

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

    const { totals, previousTotals } = totalsByTimeFrame;

    switch (type) {
        case 'lowInventory':
            return (
                <StatWidget
                    title="Low Inventory"
                    value={totals.lowInventoryCount.toString()}
                    prevValue={previousTotals.lowInventoryCount}
                    icon={<IconUsers size={24} />}
                    timeframe={timeFrame}
                />
            );
        case 'ordersTotals':
            return (
                <StatWidget
                    title="Orders Totals"
                    value={totals.ordersCount.toString()}
                    prevValue={previousTotals.ordersCount}
                    icon={<IconUsers size={24} />}
                    timeframe={timeFrame}
                />
            );
        case 'salesTotals':
            return (
                <StatWidget
                    title="Sales Totals"
                    value={totals.salesCount.toString()}
                    prevValue={previousTotals.salesCount}
                    icon={<IconUsers size={24} />}
                    timeframe={timeFrame}
                />
            );
        case 'customersTotals':
            return (
                <StatWidget
                    title="Customers Totals"
                    value={totals.customersCount.toString()}
                    prevValue={previousTotals.customersCount}
                    icon={<IconUsers size={24} />}
                    timeframe={timeFrame}
                />
            );
        case 'graph':
            return <GraphWidget item={item} data={salesData} returnActions={returnedActions} returnMenuOptions={returnedMenuOptions} />;
        case 'categoryPie':
            return <PieChartCard timeframe={timeFrame} orders={orders} products={products} />;
        default:
            return null;
    }
}

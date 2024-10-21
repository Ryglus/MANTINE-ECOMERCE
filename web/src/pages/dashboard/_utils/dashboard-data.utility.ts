import {Product} from "../../../lib/api/dto/product.dto";
import {Order} from "../../../lib/api/dto/order.dto";
import {User} from "../../../lib/api/dto/account.dto";
import {formatISO} from 'date-fns';
import {filterDataByTimeframe, getProductPriceById} from './dashboard-date.utility';

const processOrders = (
    orders: Order[],
    products: Product[],
    users: User[],
    timeframe: string,
    calculation: (filteredOrders: Order[], products: Product[], users: User[]) => any
) => {
    const filteredOrders = orders.filter(order => filterDataByTimeframe(order.date, timeframe));
    return calculation(filteredOrders, products, users);
};

export const calculateSalesData = (orders: Order[], products: Product[], timeframe: string): { date: string, Sales: number }[] => {
    return processOrders(orders, products, [], timeframe, (filteredOrders) => {
        const salesByDate: Record<string, number> = filteredOrders.reduce((acc: Record<string, number>, order) => {
            const formattedDate = formatISO(new Date(order.date), { representation: 'date' });
            const totalSalesForOrder = order.products.reduce((sum, product) => {
                return sum + (getProductPriceById(product.productId, products) * product.quantity);
            }, 0);

            if (!acc[formattedDate]) {
                acc[formattedDate] = totalSalesForOrder;
            } else {
                acc[formattedDate] += totalSalesForOrder;
            }
            return acc;
        }, {});

        return Object.entries(salesByDate).map(([date, sales]) => ({ date, Sales: sales }));
    });
};

export const calculateTotals = (
    products: Product[],
    orders: Order[],
    users: User[],
    timeframe: string
) => {
    return processOrders(orders, products, users, timeframe, (filteredOrders, products, users) => {
        const totalSales = filteredOrders.reduce((acc, order) => {
            return acc + order.products.reduce((sum, product) => {
                const productPrice = getProductPriceById(product.productId, products);
                return sum + product.quantity * productPrice;
            }, 0);
        }, 0);

        const ordersCount = filteredOrders.length;
        const customersCount = users.length;
        const lowInventoryCount = products.filter(product => product.rating.count < 5).length;

        return {
            totalSales,
            ordersCount,
            customersCount,
            lowInventoryCount,
        };
    });
};

export const calculateCategoryDistribution = (
    orders: Order[],
    products: Product[],
    timeframe: string
): { category: string, sales: number }[] => {
    return processOrders(orders, products, [], timeframe, (filteredOrders, products) => {
        const salesByCategory: Record<string, number> = {};

        filteredOrders.forEach((order) => {
            order.products.forEach((orderProduct) => {
                const product = products.find(p => p.id === orderProduct.productId);
                if (product) {
                    const category = product.category;
                    const sales = orderProduct.quantity * getProductPriceById(orderProduct.productId, products);

                    if (!salesByCategory[category]) {
                        salesByCategory[category] = 0;
                    }
                    salesByCategory[category] += sales;
                }
            });
        });

        return Object.entries(salesByCategory).map(([category, sales]) => ({ category, sales }));
    });
};

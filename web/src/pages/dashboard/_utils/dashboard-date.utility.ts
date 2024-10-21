import {
    endOfWeek,
    format,
    isAfter,
    isSameYear,
    startOfDay,
    startOfMonth,
    startOfWeek,
    startOfYear,
    subDays,
    subMonths,
    subYears
} from 'date-fns';
import {Product} from "../../../lib/api/dto/product.dto";

export const timeframes = [
    {
        key: 'last_24_hours',
        label: 'Last 24 hours',
        getDate: (now: Date) => subDays(now, 1),
    },
    {
        key: 'last_7_days',
        label: 'Last 7 days',
        getDate: (now: Date) => subDays(now, 7),
    },
    {
        key: 'last_30_days',
        label: 'Last 30 days',
        getDate: (now: Date) => subDays(now, 30),
    },
    {
        key: 'last_90_days',
        label: 'Last 90 days',
        getDate: (now: Date) => subDays(now, 90),
    },
    {
        key: 'last_6_months',
        label: 'Last 6 months',
        getDate: (now: Date) => subMonths(now, 6),
    },
    {
        key: 'this_year',
        label: 'This Year',
        getDate: (now: Date) => startOfYear(now),
        isSameYear: (date: Date) => isSameYear(date, new Date()),
    },
    {
        key: 'last_year',
        label: 'Last Year',
        getDate: (now: Date) => subYears(now, 1),
        isSameYear: (date: Date) => isSameYear(date, subYears(new Date(), 1)),
    },
    {
        key: 'all_time',
        label: 'All Time',
        getDate: () => new Date(0),
    },
];

const getTimeframeConfig = (key: string) => timeframes.find(t => t.key === key);

export const filterDataByTimeframe = (date: string, timeframe: string): boolean => {
    const now = new Date();
    const orderDate = new Date(date);

    const config = getTimeframeConfig(timeframe);
    if (!config) return true;

    if (timeframe === 'this_year' || timeframe === 'last_year') {
        return config.isSameYear ? config.isSameYear(orderDate) : isSameYear(orderDate, now);
    }

    return isAfter(orderDate, config.getDate(now));
};

export const getPreviousTimeframe = (timeframe: string): string => {
    const index = timeframes.findIndex(t => t.key === timeframe);
    if (index === -1 || index === timeframes.length - 1) {
        return 'all_time';
    }
    return timeframes[index + 1].key;
};

export const labelByTimeframe = (timeframe: string): string => {
    const config = getTimeframeConfig(timeframe);
    return config?.label || 'All Time';
};

export const getProductPriceById = (id: number, products: Product[]): number => {
    const product = products.find(p => p.id === id);
    return product ? product.price : 0;
};

export const groupDataByTimeUnit = (data: { date: string, Sales: number }[], unit: 'year' | 'month' | 'week' | 'day') => {
    const sortedData = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return sortedData.reduce((acc: Record<string, number>, item) => {
        const date = new Date(item.date);
        let formattedDate;

        switch (unit) {
            case 'year':
                formattedDate = format(startOfYear(date), 'yyyy');
                break;
            case 'month':
                formattedDate = format(startOfMonth(date), 'MMMM yyyy');
                break;
            case 'week': {
                const startOfWeekDate = startOfWeek(date, { weekStartsOn: 1 });
                const endOfWeekDate = endOfWeek(startOfWeekDate, { weekStartsOn: 1 });
                formattedDate = `${format(startOfWeekDate, 'dd')}-${format(endOfWeekDate, 'dd.MM.yyyy')}`;
                break;
            }
            case 'day':
            default:
                formattedDate = format(startOfDay(date), 'yyyy-MM-dd');
                break;
        }

        if (!acc[formattedDate]) {
            acc[formattedDate] = item.Sales;
        } else {
            acc[formattedDate] += item.Sales;
        }

        return acc;
    }, {});
};

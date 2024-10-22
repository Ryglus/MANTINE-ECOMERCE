import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface GridSize {
    colSpan: number;
    rowSpan: number;
}

interface DashboardStore {
    tileOrder: string[];
    gridSizes: Record<string, GridSize>;
    timeframes: Record<string, string>;
    setTileOrder: (newOrder: string[]) => void;
    setGridSize: (tileId: string, newSize: GridSize) => void;
    setTimeframe: (tileId: string, timeframe: string) => void;
}

export const useDashboardStore = create<DashboardStore>()(
    persist(
        (set) => ({
            tileOrder: [
                'lowInventory',
                'orders',
                'totalSales',
                'customers',
                'graph',
                'categoryPie',
            ],
            gridSizes: {
                lowInventory: { colSpan: 3, rowSpan: 1 },
                orders: { colSpan: 3, rowSpan: 1 },
                totalSales: { colSpan: 3, rowSpan: 1 },
                customers: { colSpan: 3, rowSpan: 1 },
                graph: { colSpan: 6, rowSpan: 2 },
                categoryPie: { colSpan: 3, rowSpan: 2 },
            },
            timeframes: {
                lowInventory: 'all_time',
                orders: 'all_time',
                totalSales: 'all_time',
                customers: 'all_time',
                graph: 'all_time',
                categoryPie: 'all_time',
            },
            setTileOrder: (newOrder) => set({ tileOrder: newOrder }),
            setGridSize: (tileId, newSize) =>
                set((state) => ({
                    gridSizes: { ...state.gridSizes, [tileId]: newSize },
                })),
            setTimeframe: (tileId, timeframe) =>
                set((state) => ({
                    timeframes: { ...state.timeframes, [tileId]: timeframe },
                })),
        }),
        {
            name: 'velvet-cove/dashboard',
        }
    )
);

import {create} from "zustand";
import {persist} from "zustand/middleware";

interface GridSettings {
    w: number;
    h: number;
    x: number;
    y: number;
    min_w?: number;
    max_w?: number;
    min_h?: number;
    max_h?: number;
    prev?: GridSettings;
}

export interface ItemProps {
    id: string;
    title?: string;
    type: string;
    timeFrame: string | 'all_time';
    groupBy?: string | 'day';
    gridSettings: GridSettings;
}

interface DashboardStore {
    items: ItemProps[];
    setLayout: (layout: Array<{ id: string; gridSettings: Partial<GridSettings> }>) => void;
    addItem: (item: ItemProps) => void;
    setTimeFrame: (id: string, timeFrame: string) => void;
    setGroupBy: (id: string, groupBy: string) => void;
}

export const useDashboardStore = create<DashboardStore>()(
    persist(
        (set) => ({
            items: [
                {
                    id: "1",
                    title:"low invy",
                    type: 'lowInventory',
                    timeFrame: 'all_time',
                    gridSettings: {
                        w: 3,
                        h: 2,
                        x: 0,
                        y: 0,
                        min_w: 2,
                        min_h: 2,
                    },
                },
                {
                    id: "2",
                    title:"ordersTotals",
                    type: 'ordersTotals',
                    timeFrame: 'all_time',
                    gridSettings: {
                        w: 3,
                        h: 2,
                        x: 3,
                        y: 0,
                        min_w: 2,
                        min_h: 2,
                    },
                },
                {
                    id: "3",
                    title:"salesTotals",
                    type: 'lowInventory',
                    timeFrame: 'all_time',
                    gridSettings: {
                        w: 3,
                        h: 2,
                        x: 6,
                        y: 0,
                        min_w: 2,
                        min_h: 2,
                    },
                },
                {
                    id: "4",
                    title:"customersTotals",
                    type: 'customersTotals',
                    timeFrame: 'all_time',
                    gridSettings: {
                        w: 3,
                        h: 2,
                        x: 0,
                        y: 2,
                        min_w: 2,
                        min_h: 2,
                    },
                },
                {
                    id: "5",
                    title:"category pie",
                    type: 'categoryPie',
                    timeFrame: 'all_time',
                    gridSettings: {
                        w: 3,
                        h: 4,
                        x: 9,
                        y: 0,
                        min_w: 2,
                        min_h: 3,
                    },
                },
                {
                    id: "6",
                    title:"graph",
                    type: 'graph',
                    timeFrame: 'all_time',
                    gridSettings: {
                        w: 6,
                        h: 4,
                        x: 3,
                        y: 2,
                        min_w: 2,
                        min_h: 3,
                    },
                }
            ],
            setLayout: (layout) =>
                set((state) => ({
                    items: state.items.map((item) => {
                        const layoutItem = layout.find((l) => l.id === item.id);
                        return layoutItem
                            ? {
                                ...item,
                                gridSettings: { ...item.gridSettings, ...layoutItem.gridSettings },
                            }
                            : item;
                    }),
                })),
            addItem: (item) =>
                set((state) => ({
                    items: [...state.items, item],
                })),
            setTimeFrame: (id: string, timeFrame: string) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id
                            ? {
                                ...item,
                                timeFrame,
                            }
                            : item
                    ),
                })),
            setGroupBy: (id: string, groupBy: string) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id
                            ? {
                                ...item,
                                groupBy,
                            }
                            : item
                    ),
                })),
        }),
        {
            name: "velvet-cove/dashboard",
        }
    )
);

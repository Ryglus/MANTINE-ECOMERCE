import {createRef, RefObject, useEffect, useRef} from "react";
import {GridStack, GridStackNode} from "gridstack";
import {ItemProps, useDashboardStore} from "../../../store/dashboard-store";
import WidgetCard from "./widget.card.component";
import {useMediaQuery} from "@mantine/hooks";

interface ControlledStackProps {
    items: ItemProps[];
}

export default function ControlledStack({ items }: ControlledStackProps) {
    const refs = useRef<{ [key: string]: RefObject<HTMLDivElement> }>({});
    const gridRef = useRef<GridStack | null>(null);
    const setLayout = useDashboardStore((state) => state.setLayout);
    const isSmallScreen = useMediaQuery('(max-width: 40em)', true, {
        getInitialValueInEffect: false,
    })

    if (Object.keys(refs.current).length !== items.length) {
        items.forEach(({ id }) => {
            refs.current[id] = refs.current[id] || createRef();
        });
    }

    useEffect(() => {
        if (!gridRef.current) {
            gridRef.current = GridStack.init({
                float: true,
                cellHeight: 100,
            }, ".controlled");
        }

        const grid = gridRef.current;

        grid.batchUpdate();
        grid.removeAll(false);

        items.forEach(({ id }) => {
            const element = refs.current[id]?.current;
            if (element) grid.makeWidget(element);
        });

        grid.commit();

        grid.on("change", (event, changedItems: GridStackNode[]) => {

            setLayout(changedItems.map((item) => ({
                id: item.el?.getAttribute("id") || "",
                gridSettings: {
                    x: item.x || 0,
                    y: item.y || 0,
                    w: item.w || 1,
                    h: item.h || 1,
                },
            })));
        });

        return () => {
            grid.off("change");
        };
    }, [items, setLayout]);

    useEffect(() => {
        const grid = gridRef.current;
        if (grid) {
            grid.batchUpdate();
            items.forEach((item) => {
                const element = refs.current[item.id]?.current;
                if (element) {
                    const node = grid.engine.nodes.find((n) => n.el === element);
                    if (node) {
                        node.w = item.gridSettings.w;
                        node.x = item.gridSettings.x;
                        node.y = item.gridSettings.y;
                        grid.update(element, node);
                    }
                }
            });
            grid.commit();
        }
    }, [isSmallScreen, items]);

    return (
        <>
            <div className="grid-stack controlled">
                {items.map((item) => (
                    <div
                        className="grid-stack-item"
                        ref={refs.current[item.id]}
                        key={item.id}
                        id={item.id}
                        gs-w={item.gridSettings.w || 1}
                        gs-h={item.gridSettings.h || 2}
                        gs-x={item.gridSettings.x || 0}
                        gs-y={item.gridSettings.y || 0}
                        gs-min-w={item.gridSettings.min_w || 1}
                        gs-max-w={item.gridSettings.max_w || 12}
                        gs-min-h={item.gridSettings.min_h || 1}
                        gs-max-h={item.gridSettings.max_h || 10}
                    >
                        <div className="grid-stack-item-content">
                            <WidgetCard item={item} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

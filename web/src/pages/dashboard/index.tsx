import {useDashboardStore} from "../../store/dashboard-store";
import ControlledStack from "./_components/controlled-stack.component";

export default function DashboardIndexPage() {
    const items = useDashboardStore((state) => state.items);
    return (
        <>
            <ControlledStack
                items={items}
            />
        </>
    );
}

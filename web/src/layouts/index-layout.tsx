import {ReactNode} from 'react';
import PageFooter from '../components/common/page-footer.component';
import EcommerceHeader from '../components/common/page-header.component';

interface IndexLayoutProps {
    children: ReactNode;
    takeSpace?: boolean;
}

export default function MainLayout(
    {
        children,
        takeSpace = true
    }: IndexLayoutProps) {

    return (
        <div className="flex flex-col min-h-screen">
            <EcommerceHeader takeSpace={takeSpace} />
            <main className="flex-1">
                {children}
            </main>
            <PageFooter />
        </div>
    );
}

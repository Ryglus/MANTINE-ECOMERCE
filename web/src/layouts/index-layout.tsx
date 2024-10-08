import { ReactNode } from 'react';
import PageHeader from '../components/page-header.component';

interface IndexLayoutProps {
    children: ReactNode;
    takeSpace?: boolean;
}

export default function MainLayout({ children, takeSpace = true }: IndexLayoutProps) {
    return (
        <>
            <PageHeader takeSpace={takeSpace} />
            <main>
                {children}
            </main>
        </>
    );
}

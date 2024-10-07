import { ReactNode } from 'react';
import PageHeader from '../../../components/page-header.component';

interface IndexLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: IndexLayoutProps) {
    return (
        <>
            <PageHeader takeSpace={false}/>
            <main>{children}</main>
        </>
    );
}

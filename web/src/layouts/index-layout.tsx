import {ReactNode} from 'react';
import PageFooter from "../components/ui/page-footer.component";
import EcommerceHeader from "../components/ui/page-header.component";


interface IndexLayoutProps {
    children: ReactNode;
    takeSpace?: boolean;
}

export default function MainLayout({ children, takeSpace = true }: IndexLayoutProps) {
    return (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <EcommerceHeader takeSpace={takeSpace} />
            <main style={{flex: 1}}>
                {children}
            </main>
            <PageFooter />
        </div>
    );
}

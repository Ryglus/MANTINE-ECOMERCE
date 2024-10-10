import {ReactNode} from 'react';
import PageHeader from '../components/page-header.component';
import PageFooter from "../components/page-footer.component";


interface IndexLayoutProps {
    children: ReactNode;
    takeSpace?: boolean;
}

export default function MainLayout({ children, takeSpace = true }: IndexLayoutProps) {
    return (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <PageHeader takeSpace={takeSpace}/>
            <main style={{flex: 1}}>
                {children}
            </main>
            <PageFooter/>
        </div>
    );
}

import {ReactNode} from 'react';
import { Container } from '@mantine/core';
import PageHeader from "../../../../../components/page-header.component";
import SvgTopPageBg from "../../../../../components/svg-top-page-bg.component";

interface IndexLayoutProps {
    children: ReactNode;
}

export default function ProductDetailLayout({ children }: IndexLayoutProps) {

    return (
        <>
            <PageHeader takeSpace={true} />
            <SvgTopPageBg color1={"#251D36ff"} color2={"#CBAB7Cff"}/>
            <Container className="mt-5" >
                {children}
            </Container>
        </>
    );
}

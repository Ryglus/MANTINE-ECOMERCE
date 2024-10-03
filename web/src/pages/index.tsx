import { Container } from '@mantine/core';

import PageHeader from "../components/page-header.component.tsx";

export default function Page() {
    return (
        <div className="flex justify-center items-center min-h-screen"> {/* Full height flex container */}
            <Container className="align-middle">
                <PageHeader title="VelvetCove" />


            </Container>
        </div>
    );
}

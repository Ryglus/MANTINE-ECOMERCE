import {ReactNode, useState} from 'react';
import { Container, Input, Group, Button } from '@mantine/core';
import PageHeader from "../../../components/page-header.component";

interface IndexLayoutProps {
    children: ReactNode;
}

export default function ProductShopperLayout({ children }: IndexLayoutProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };



    return (
        <>
            <PageHeader />
            <Container className="mt-5">
                <Group p="apart" align="center" mb="md">
                    <Input
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        size="lg"
                        className="w-full max-w-lg"
                    />
                    <Button
                        onClick={() => alert('Filter options coming soon!')}
                        variant="outline"
                        color="gray"
                        radius="md"
                    >
                        Filters
                    </Button>
                </Group>
            </Container>

            <Container>
                {children}
            </Container>
        </>
    );
}

import {Container, Text, Title} from '@mantine/core';
import MainLayout from '../layouts/index-layout';

export default function NotFoundPage() {
    return (
        <MainLayout>
            <Container size="lg" style={{ textAlign: 'center', marginTop: '5rem' }}>
                <Title order={1} style={{ fontSize: '4rem' }} c="red">
                    404
                </Title>
                <Text size="lg" c="dimmed" mt="md">
                    Oops! The page you’re looking for doesn’t exist.
                </Text>

            </Container>
        </MainLayout>
    );
}

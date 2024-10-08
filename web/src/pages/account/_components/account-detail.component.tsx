import { Card, Group, Loader, Text, Title, Button, Container } from '@mantine/core';
import {useGetUserInfo} from "../../../lib/api/user.api";
import {useAuthStore} from "../../../store/auth-store";
import {useEffect} from "react";
import MainLayout from "../../../layouts/index-layout";

const AccountDetail = () => {
    const { mutate, isPending, isError } = useGetUserInfo();

    const user = useAuthStore((state) => state.user);
    useEffect(() => {
        mutate(1)
    }, [mutate]);

    if (isPending) {
        return (
            <MainLayout>
                <Container>
                    <Loader size="lg" />
                </Container>
            </MainLayout>
        );
    }

    if (isError) {
        return (
            <MainLayout>
                <Container>
                    <Text c="red">Error fetching user details.</Text>
                </Container>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Container size="md" my="lg">
                <Card shadow="md" radius="md" p="lg" withBorder>
                    <Title order={2} mb="lg">
                        Account Details
                    </Title>

                    <Group p="apart" grow>
                        <Text size="lg" fw={500}>
                            Name: {user?.name.firstname} {user?.name.lastname}
                        </Text>
                    </Group>

                    <Group p="apart" grow>
                        <Text size="lg" fw={500}>
                            Username: {user?.username}
                        </Text>
                    </Group>

                    <Group p="apart" grow>
                        <Text size="lg" fw={500}>
                            Email: {user?.email}
                        </Text>
                    </Group>

                    <Group p="apart" grow>
                        <Text size="lg" fw={500}>
                            Phone: {user?.phone}
                        </Text>
                    </Group>

                    <Group p="apart" grow mt="lg">
                        <Text size="lg" fw={500}>
                            Address: {user?.address?.street}, {user?.address?.city}
                        </Text>
                    </Group>

                    <Button mt="xl" color="blue">
                        Edit Account
                    </Button>
                </Card>
            </Container>
        </MainLayout>
    );
};

export default AccountDetail;

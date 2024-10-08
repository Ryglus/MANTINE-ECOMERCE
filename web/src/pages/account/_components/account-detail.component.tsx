import { Card, Group, Loader, Text, Title, Button, Container } from '@mantine/core';

import AccountLayout from "../_layout/account-layout";
import {useGetUserInfo} from "../../../lib/api/user.api";

const AccountDetail = () => {
    const { isSuccess, isLoading, isError } = useGetUserInfo();
    const user = isSuccess;
    console.log()
    if (isLoading) {
        return (
            <AccountLayout>
                <Container>
                    <Loader size="lg" />
                </Container>
            </AccountLayout>
        );
    }

    if (isError) {
        return (
            <AccountLayout>
                <Container>
                    <Text color="red">Error fetching user details.</Text>
                </Container>
            </AccountLayout>
        );
    }

    return (
        <AccountLayout>
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
                            Address: {user?.address.street}, {user?.address.city}
                        </Text>
                    </Group>

                    <Button mt="xl" color="blue">
                        Edit Account
                    </Button>
                </Card>
            </Container>
        </AccountLayout>
    );
};

export default AccountDetail;

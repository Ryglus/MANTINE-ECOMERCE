import {Avatar, Box, Button, Container, Divider, Loader, Stack, Text, Title} from '@mantine/core';
import {useGetUserInfo} from '../../../lib/api/user.api';
import {useAuthStore} from '../../../store/auth-store';
import {useEffect} from 'react';
import MainLayout from '../../../layouts/index-layout';
import {IconUserEdit} from '@tabler/icons-react';
import {Link} from "react-router-dom";

const AccountDetail = () => {
    const { mutate, isPending, isError } = useGetUserInfo();
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        mutate(1);
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
                    <Text c="red" size="lg">
                        Error fetching user details.
                    </Text>
                </Container>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Container size="sm" my="lg">
                <Container p="xl" style={{ position: 'relative' }}>
                    <Box style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
                        <Avatar
                            size={120}
                            radius="100%"
                            src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${user?.name.firstname}-${user?.name.lastname}`}
                            alt={`${user?.name.firstname} ${user?.name.lastname}`}
                        />
                    </Box>

                    <Title className={"text-center"} order={2} size={32} mb="lg">
                        {user?.name.firstname} {user?.name.lastname}
                    </Title>

                    <Divider mb="lg" />

                    <Stack dir="column" gap="xs" align="flex-start">
                        <Text size="lg" fw={500}>
                            <strong>Username:</strong> {user?.username}
                        </Text>
                        <Text size="lg" fw={500}>
                            <strong>Email:</strong> {user?.email}
                        </Text>
                        <Text size="lg" fw={500}>
                            <strong>Phone:</strong> {user?.phone}
                        </Text>
                        <Text size="lg" fw={500}>
                            <strong>Address:</strong> {user?.address?.street}, {user?.address?.city}
                        </Text>
                    </Stack>

                    <Button
                        fullWidth
                        mt="xl"
                        size="lg"
                        radius="md"
                        leftSection={<IconUserEdit size={20} />}
                        styles={{ root: { backgroundColor: '#4a4066' } }}
                    >
                        Edit Account
                    </Button>
                    <Button
                        component={Link}
                        to={'/dashboard'}
                        mt="xl"
                        fullWidth
                        size="md"
                        color="gray"
                        radius="md"
                    >
                        Go to Admin
                    </Button>
                </Container>
            </Container>

        </MainLayout>
    );
};

export default AccountDetail;

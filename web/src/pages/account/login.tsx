import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Button, Group, Paper, Title, Stack, Divider, Container } from '@mantine/core';
import { useLogin } from '../../lib/api/auth.api';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import {useNavigate} from "react-router-dom";
import MainLayout from "../../layouts/index-layout";

const Login = () => {
    const navigate = useNavigate();
    useAuthRedirect({});

    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },
    });

    const { mutate, isPending, error } = useLogin();

    const handleSubmit = (values: { username: string; password: string }) => {
        mutate(values);
    };

    return (
        <MainLayout>
            <Container size={"xl"}>
                <Paper
                    shadow="md"
                    radius="md"
                    p="lg"
                    withBorder
                    style={{ maxWidth: 700, margin: '0 auto' }}
                >
                    <Title order={2} mb="lg">
                        Login
                    </Title>

                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Stack>
                            <TextInput
                                label="Username"
                                placeholder="Enter your username"
                                {...form.getInputProps('username')}
                                required
                            />
                            <PasswordInput
                                label="Password"
                                placeholder="Enter your password"
                                {...form.getInputProps('password')}
                                required
                            />
                            <Button type="submit" fullWidth color="blue" mt="md" disabled={isPending}>
                                {isPending ? 'Logging in...' : 'Login'}
                            </Button>
                        </Stack>
                    </form>

                    {error && <p style={{ color: 'red' }}>{error.message}</p>}

                    <Divider my="lg" />

                    <Group p="apart" mt="md">
                        <Button variant="light" fullWidth color="gray" size="sm">
                            Forgot Password?
                        </Button>
                        <Button
                            variant="light"
                            fullWidth
                            color="gray"
                            size="sm"
                            onClick={() => navigate('/account/register')}  // Navigate to the register page
                        >
                            Create an Account
                        </Button>
                    </Group>
                </Paper>
            </Container>
        </MainLayout>
    );
};

export default Login;

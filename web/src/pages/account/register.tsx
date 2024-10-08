import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Group, Paper, Title, Stack, Divider, Container } from '@mantine/core';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import {useNavigate} from "react-router-dom";
import MainLayout from "../../layouts/index-layout";

const Register = () => {
    const navigate = useNavigate();
    useAuthRedirect({ redirectToLoginOnUnauth: false });

    const form = useForm({
        initialValues: {
            email: '',
            username: '',
            password: '',
            firstname: '',
            lastname: '',
        },
    });

    return (
        <MainLayout>
            <Container size="sm" my="xl">
                <Paper
                    shadow="md"
                    radius="md"
                    p="xl"
                    withBorder
                    style={{ maxWidth: 500, margin: '0 auto' }}
                >
                    <Title order={2} mb="lg">
                        Create an Account
                    </Title>

                    <form onSubmit={form.onSubmit((values) => console.log(values))}>
                        <Stack>
                            <TextInput
                                label="Email"
                                placeholder="Enter your email"
                                {...form.getInputProps('email')}
                                required
                            />
                            <TextInput
                                label="Username"
                                placeholder="Choose a username"
                                {...form.getInputProps('username')}
                                required
                            />
                            <PasswordInput
                                label="Password"
                                placeholder="Choose a strong password"
                                {...form.getInputProps('password')}
                                required
                            />
                            <Group grow>
                                <TextInput
                                    label="First Name"
                                    placeholder="John"
                                    {...form.getInputProps('firstname')}
                                    required
                                />
                                <TextInput
                                    label="Last Name"
                                    placeholder="Doe"
                                    {...form.getInputProps('lastname')}
                                    required
                                />
                            </Group>

                            <Button type="submit" fullWidth mt="md" size="md" color="blue">
                                Register
                            </Button>
                        </Stack>
                    </form>

                    <Divider my="lg" />

                    <Group p="center" mt="md">
                        <Button
                            variant="light"
                            fullWidth
                            color="gray"
                            size="sm"
                            onClick={() => navigate('/account/login')}
                        >
                            Already have an account? Login
                        </Button>
                    </Group>
                </Paper>
            </Container>
        </MainLayout>
    );
};

export default Register;

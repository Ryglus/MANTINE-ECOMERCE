import {useForm} from "@mantine/form";
import {Box, Button, Container, Divider, Group, PasswordInput, Stack, Text, TextInput, Title} from '@mantine/core';
import {useLogin} from '../../lib/api/auth.api';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import {Link} from "react-router-dom";
import MainLayout from "../../layouts/index-layout";
import SvgPageBg from "../../components/ui/svg-page-bg.component";

const Login = () => {
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
        <SvgPageBg>
            <MainLayout>
                <Container size="lg" style={{ padding: '60px 0' }}>
                    <Box
                        style={{
                            maxWidth: 500,
                            margin: '0 auto',
                            padding: '40px',
                            borderRadius: '10px',
                        }}
                    >
                        <Title order={2} size={30} mb="lg" className={"text-center"}>
                            Login
                        </Title>

                        <form onSubmit={form.onSubmit(handleSubmit)}>
                            <Stack >
                                <TextInput
                                    label="Username"
                                    placeholder="Enter your username"
                                    {...form.getInputProps('username')}
                                    size="lg"
                                    radius="md"
                                    required
                                />
                                <PasswordInput
                                    label="Password"
                                    placeholder="Enter your password"
                                    {...form.getInputProps('password')}
                                    size="lg"
                                    radius="md"
                                    required
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    size="lg"
                                    color="primary"
                                    radius="md"
                                    mt="lg"
                                    disabled={isPending}
                                    styles={{ root: { height: 50 } }}
                                >
                                    {isPending ? 'Logging in...' : 'Login'}
                                </Button>
                            </Stack>
                        </form>

                        {error && <Text c="red" mt="md">{error.message}</Text>}

                        <Divider my="xl" />

                        <Group  grow>
                            <Button variant="outline" size="md" component={Link}
                                    to={'/account/forgot-password'}>
                                Forgot Password?
                            </Button>
                            <Button
                                component={Link}
                                to={'/account/register'}
                                variant="outline"
                                size="md"
                            >
                                Create an Account
                            </Button>
                        </Group>

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
                    </Box>
                </Container>
            </MainLayout>
        </SvgPageBg>
    );
};

export default Login;

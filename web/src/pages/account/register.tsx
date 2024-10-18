import {useForm} from '@mantine/form';
import {Box, Button, Container, Divider, Group, PasswordInput, Stack, TextInput, Title} from '@mantine/core';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import {Link} from 'react-router-dom';
import MainLayout from '../../layouts/index-layout';
import SvgPageBg from "../../components/ui/svg-page-bg.component";

const Register = () => {
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
                            Create an Account
                        </Title>

                        <form onSubmit={form.onSubmit((values) => console.log(values))}>
                            <Stack gap="lg">
                                <Group grow>
                                    <TextInput
                                        label="First Name"
                                        placeholder="John"
                                        {...form.getInputProps('firstname')}
                                        size="lg"
                                        radius="md"
                                        required
                                    />
                                    <TextInput
                                        label="Last Name"
                                        placeholder="Doe"
                                        {...form.getInputProps('lastname')}
                                        size="lg"
                                        radius="md"
                                        required
                                    />
                                </Group>
                                <TextInput
                                    label="Username"
                                    placeholder="Choose a username"
                                    {...form.getInputProps('username')}
                                    size="lg"
                                    radius="md"
                                    required
                                />
                                <TextInput
                                    label="Email"
                                    placeholder="Enter your email"
                                    {...form.getInputProps('email')}
                                    size="lg"
                                    radius="md"
                                    required
                                />
                                <PasswordInput
                                    label="Password"
                                    placeholder="Choose a strong password"
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
                                    styles={{ root: { height: 50 } }}
                                >
                                    Register
                                </Button>
                            </Stack>
                        </form>

                        <Divider my="xl" />

                        <Group grow>
                            <Button
                                variant="outline"
                                size="md"
                                component={Link}
                                to={'/account/login'}
                            >
                                Already have an account? Login
                            </Button>
                        </Group>
                    </Box>
                </Container>
            </MainLayout>
        </SvgPageBg>
    );
};

export default Register;

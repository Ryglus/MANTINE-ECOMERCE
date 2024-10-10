import {ActionIcon, Anchor, Center, Container, Grid, Group, Image, Text} from '@mantine/core';
import {IconBrandFacebook, IconBrandInstagram, IconBrandTwitter} from '@tabler/icons-react';

export default function PageFooter() {
    return (
        <footer style={{ marginTop: 'auto' }}>
            <Container size="xl" className="text-white py-8 bg-gray-900 rounded-t-2xl">
                <Grid align="center">
                    <Grid.Col span={4}>
                        <Group dir="column" align="flex-start" gap="xs">
                            <Anchor href="/about" c="gray" size="sm">
                                About Us
                            </Anchor>
                            <Anchor href="/contact" c="gray" size="sm">
                                Contact
                            </Anchor>
                            <Anchor href="/privacy" c="gray" size="sm">
                                Privacy Policy
                            </Anchor>
                            <Anchor href="/terms" c="gray" size="sm">
                                Terms & Conditions
                            </Anchor>
                        </Group>
                    </Grid.Col>

                    <Grid.Col span={4}>
                        <Center>
                            <Image
                                style={{ height: '70px' }}
                                src="/logo2edit.webp"
                                alt="VelvetCove Logo"
                                fit="contain"
                                className="object-contain"
                            />
                        </Center>
                    </Grid.Col>

                    <Grid.Col span={4}>
                        <Group p="right" gap="xs">
                            <ActionIcon size="lg" component="a" href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <IconBrandFacebook size={24} color="white" />
                            </ActionIcon>
                            <ActionIcon size="lg" component="a" href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <IconBrandTwitter size={24} color="white" />
                            </ActionIcon>
                            <ActionIcon size="lg" component="a" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <IconBrandInstagram size={24} color="white" />
                            </ActionIcon>
                        </Group>
                    </Grid.Col>
                </Grid>

                <Text size="sm" c="gray" className={"text-center"} mt="md">
                    © 2024 VelvetCove. All rights reserved.
                </Text>
            </Container>
        </footer>
    );
}

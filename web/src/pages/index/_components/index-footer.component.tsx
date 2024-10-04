import { Container, Group, Text, Anchor, ActionIcon } from '@mantine/core';
import { IconBrandFacebook, IconBrandTwitter, IconBrandInstagram } from '@tabler/icons-react';

export default function IndexFooter() {
    return (
        <footer className="mx-auto ">
            <Container className="text-white py-8 mt-10 bg-gray-900 rounded-t-2xl">

                <Group p="apart" className="mb-6">
                    <Group p="xl">
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

                    <Group p="md">
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
                </Group>

                <Text size="sm" c="gray">
                    © 2024 VelvetCove. All rights reserved.
                </Text>
            </Container>
        </footer>
    );
}

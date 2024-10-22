import {ActionIcon, Container, Flex, Group, Image, Paper} from '@mantine/core';
import {IconBrandFacebook, IconBrandInstagram, IconBrandTwitter} from '@tabler/icons-react';
import {Link} from "../../router";

export default function PageFooter() {
    return (
        <Paper className="mt-auto" bg="primary.9">
            <Container size="xl" py="sm">
                <Flex justify="space-between" align="center">
                    <Link to="///">
                        <Image
                            h={70}
                            src="/logo2edit.webp"
                            alt="VelvetCove Logo"
                            fit="contain"
                        />
                    </Link>
                    <Group gap="xl">
                        <Group gap="xs">
                            <ActionIcon
                                size="lg"
                                component="a"
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <IconBrandFacebook size={24} color="white" />
                            </ActionIcon>
                            <ActionIcon
                                size="lg"
                                component="a"
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <IconBrandTwitter size={24} color="white" />
                            </ActionIcon>
                            <ActionIcon
                                size="lg"
                                component="a"
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <IconBrandInstagram size={24} color="white" />
                            </ActionIcon>
                        </Group>
                    </Group>
                </Flex>
            </Container>
        </Paper>
    );
}

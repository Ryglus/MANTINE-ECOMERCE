import {ActionIcon, Container, Flex, Group, Image, useMantineTheme} from '@mantine/core';
import {IconBrandFacebook, IconBrandInstagram, IconBrandTwitter} from '@tabler/icons-react';

export default function PageFooter() {
    const theme = useMantineTheme();

    return (
        <footer style={{ backgroundColor: theme.colors.primary[9], marginTop: 'auto' }}>
            <Container size="xl" py={"sm"}>
                <Flex justify={"space-between"} >
                    <Image
                        style={{ height: '70px' }}
                        src="/logo2edit.webp"
                        alt="VelvetCove Logo"
                        fit="contain"
                        className="object-contain"
                    />
                    <Group gap="xl" align="center">
                        <Group gap="xs">
                            <ActionIcon size="lg" component="a" href="/" target="_blank" rel="noopener noreferrer">
                                <IconBrandFacebook size={24} color="white" />
                            </ActionIcon>
                            <ActionIcon size="lg" component="a" href="/" target="_blank" rel="noopener noreferrer">
                                <IconBrandTwitter size={24} color="white" />
                            </ActionIcon>
                            <ActionIcon size="lg" component="a" href="/" target="_blank" rel="noopener noreferrer">
                                <IconBrandInstagram size={24} color="white" />
                            </ActionIcon>
                        </Group>
                    </Group>
                </Flex>
            </Container>
        </footer>
    );
}

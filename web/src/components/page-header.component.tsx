import {useState} from 'react';
import {
    ActionIcon,
    Badge,
    Burger,
    Button,
    Container,
    Divider,
    Drawer,
    Group,
    Image,
    Indicator,
    Text
} from '@mantine/core';
import {Link} from 'react-router-dom';
import {IconHome, IconLogout, IconPhone, IconShoppingCart, IconStorm, IconUser} from "@tabler/icons-react";
import {useViewportSize} from '@mantine/hooks';
import {useScrollManager} from '../hooks/useScrollManager';
import {useAuthStore} from '../store/auth-store';
import {useCartStore} from '../store/cart-store';

interface PageHeaderProps {
    takeSpace?: boolean;
}

export default function PageHeader({ takeSpace = true }: PageHeaderProps) {
    const { isScrolled = false } = useScrollManager();
    const token = useAuthStore((state) => state.token);
    const clearToken = useAuthStore((state) => state.clearAuth);
    const { width } = useViewportSize();
    const [drawerOpened, setDrawerOpened] = useState(false);
    const isMobile = width < 768;

    const baseImageSize = isScrolled ? 110 : 130;
    const imageSize = isMobile ? baseImageSize * 0.9 : baseImageSize;
    const headerHeight = isScrolled ? 110 : 130;

    const cartItems = useCartStore((state) => state.items);
    const uniqueItemsCount = cartItems.length;

    const handleLogout = () => {
        clearToken();
    };

    return (
        <>
            {takeSpace && <div style={{ height: `${headerHeight}px` }} />}
            <header
                className={`fixed px-0 top-0 left-0 w-full transition-all duration-300 ease-in-out z-50 ${
                    isScrolled ? 'mt-7' : 'mt-8'
                }`}
            >
                <Container size="xl" className="mx-auto rounded-xl shadow-md relative z-10 p-4" c="primary" bg="bg">
                    <Group p="apart">
                        <Group>
                            <Link to="/">
                                <div
                                    style={{
                                        width: `${imageSize}px`,
                                        height: `${imageSize}px`,
                                    }}
                                    className="flex items-center justify-center z-20 relative -mt-10 -mb-10 transition-all duration-300 ease-in-out"
                                >
                                    <Image
                                        radius="100%"
                                        fit="contain"
                                        src="/logo2edit.webp"
                                        alt="VelvetCove Logo"
                                        className="object-contain"
                                    />
                                </div>
                            </Link>
                            {!isMobile && (
                                <Text
                                    size="xl"
                                    fw={900}
                                    style={{
                                        fontSize: isScrolled ? '1.25rem' : '1.5rem',
                                        transition: 'font-size 0.3s ease-in-out',
                                    }}
                                >
                                    VelvetCove
                                </Text>
                            )}
                        </Group>

                        {isMobile ? (
                            <>
                                <Burger
                                    opened={drawerOpened}
                                    onClick={() => setDrawerOpened((o) => !o)}
                                    size="md"
                                    className="ml-auto"
                                />
                                <Drawer
                                    opened={drawerOpened}
                                    onClose={() => setDrawerOpened(false)}
                                    padding="xl"
                                    size="md"
                                    title="Navigation"
                                >
                                    <Group dir="column" grow>
                                        <Button component={Link} to="/" variant="subtle" leftSection={<IconHome />}>
                                            HOME
                                        </Button>
                                        <Button component={Link} to="/products" variant="subtle" leftSection={<IconStorm />}>
                                            SHOP
                                        </Button>
                                        <Button component={Link} to="/contact" variant="subtle" leftSection={<IconPhone />}>
                                            CONTACT
                                        </Button>
                                        <Button component={Link} to="/account" variant="subtle" leftSection={<IconUser />}>
                                            ACCOUNT
                                        </Button>
                                        <Button
                                            component={Link}
                                            to="/cart"
                                            variant="subtle"
                                            leftSection={<IconShoppingCart />}
                                        >
                                            CART
                                            {uniqueItemsCount > 0 && (
                                                <Badge color="red" size="sm" ml={8}>
                                                    {uniqueItemsCount}
                                                </Badge>
                                            )}
                                        </Button>
                                        {token && (
                                            <Button
                                                color="red"
                                                onClick={handleLogout}
                                                variant="subtle"
                                                leftSection={<IconLogout />}
                                            >
                                                Logout
                                            </Button>
                                        )}
                                    </Group>
                                </Drawer>
                            </>
                        ) : (
                            <Group ml="auto">
                                <Button component={Link} to="/" variant="subtle">
                                    HOME
                                </Button>
                                <Button component={Link} to="/products" variant="subtle">
                                    SHOP
                                </Button>
                                <Button component={Link} to="/contact" variant="subtle">
                                    CONTACT
                                </Button>
                                <Divider orientation="vertical" />
                                {uniqueItemsCount > 0 ? (
                                    <Indicator
                                        color="red"
                                        size="lg"
                                        label={uniqueItemsCount}
                                    >
                                        <ActionIcon size="lg" component={Link} to="/cart">
                                            <IconShoppingCart size={24} />
                                        </ActionIcon>

                                    </Indicator>
                                ) : (
                                    <ActionIcon size="lg" component={Link} to="/cart">
                                        <IconShoppingCart size={24} />
                                    </ActionIcon>
                                )}
                                <Divider orientation="vertical" />
                                <ActionIcon size="lg" component={Link} to="/account">
                                    <IconUser size={24} />
                                </ActionIcon>

                                {token && (
                                    <ActionIcon size="lg" onClick={handleLogout} color="red">
                                        <IconLogout size={24} />
                                    </ActionIcon>
                                )}
                            </Group>
                        )}
                    </Group>
                </Container>
            </header>
        </>
    );
}

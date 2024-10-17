import {useState} from 'react';
import {ActionIcon, Button, Drawer, Image, Indicator, useMantineTheme} from '@mantine/core';
import {IconLogout, IconMenu2, IconShoppingCart, IconUser} from '@tabler/icons-react';
import {Link} from "react-router-dom";
import {useScrollManager} from '../../hooks/useScrollManager';
import {useAuthStore} from '../../store/auth-store';
import {useCartStore} from '../../store/cart-store';
import {useViewportSize} from '@mantine/hooks';
import ProductSearch from "../inputs/product-search-bar.component";

interface PageHeaderProps {
    takeSpace?: boolean;
}

export default function EcommerceHeader({ takeSpace = true }: PageHeaderProps) {
    const [drawerOpened, setDrawerOpened] = useState(false);
    const theme = useMantineTheme();
    const { isScrolled } = useScrollManager();
    const token = useAuthStore((state) => state.token);
    const clearToken = useAuthStore((state) => state.clearAuth);
    const cartItems = useCartStore((state) => state.items);
    const uniqueItemsCount = cartItems.length;

    const { width } = useViewportSize();

    const handleLogout = () => {
        clearToken();
    };

    const calculateSizes = () => {
        if (width < 480) {
            return {
                logoSize: isScrolled ? 40 : 50,
                headerHeight: 56,
                logoContainerHeight: 56,
            };
        } else if (width < 768) {
            return {
                logoSize: isScrolled ? 59 : 69,
                headerHeight: 85,
                logoContainerHeight: 85,
            };
        } else {
            return {
                logoSize: isScrolled ? 74 : 80,
                headerHeight: 90,
                logoContainerHeight: 90,
            };
        }
    };

    const { logoSize, headerHeight, logoContainerHeight } = calculateSizes();

    return (
        <>
            {takeSpace && <div style={{ height: `${headerHeight+10}px` }} />}
            <header
                className="w-full fixed top-0 z-50 transition-all duration-300"
                style={{
                    height: `${headerHeight}px`,
                    backgroundColor: isScrolled ? theme.colors.primary[9] : 'rgba(0, 0, 0, 0.1)',
                    boxShadow: isScrolled ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
                }}
            >
                <div className="max-w-[1480px] mx-auto flex justify-between items-center px-6 transition-all duration-300 ease-in-out">
                    <div
                        className="flex items-center"
                        style={{
                            height: `${logoContainerHeight}px`,
                            width: 'auto',
                        }}
                    >
                        <Link to="/">
                            <Image
                                src="/logo2edit.webp"
                                alt="VelvetCove Logo"
                                className="transition-all duration-300 transform"
                                style={{
                                    height: `${logoSize}px`,
                                    width: 'auto',
                                    transform: isScrolled ? 'scale(0.95)' : 'scale(1)',
                                }}
                            />
                        </Link>
                    </div>

                    <nav className="hidden lg:flex gap-6">
                        <Button component={Link} to="/" size={"md"} variant="subtle" color="primary" className="hover:scale-105 transition-transform">
                            Home
                        </Button>
                        <Button component={Link} to="/products" size={"md"} variant="subtle" color="primary" className="hover:scale-105 transition-transform">
                            Shop
                        </Button>
                        <Button component={Link} to="/contact" size={"md"} variant="subtle" color="primary" className="hover:scale-105 transition-transform">
                            Contact
                        </Button>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:block">
                            <ProductSearch />
                        </div>

                        {uniqueItemsCount > 0 ? (
                            <Link to="/cart" className="hover:scale-110 transition-transform">
                                <Indicator
                                    color="red"
                                    size="lg"
                                    label={uniqueItemsCount}
                                >
                                    <ActionIcon size="lg" variant="light">
                                        <IconShoppingCart size={24} />
                                    </ActionIcon>
                                </Indicator>
                            </Link>
                        ) : (
                            <ActionIcon component={Link} to="/cart" size="lg" variant="light" className="hover:scale-110 transition-transform">
                                <IconShoppingCart size={24} />
                            </ActionIcon>
                        )}
                        <ActionIcon component={Link} to="/account" size="lg" variant="light" className="hover:scale-110 transition-transform">
                            <IconUser />
                        </ActionIcon>

                        {token && (
                            <ActionIcon size="lg" onClick={handleLogout} className="hover:scale-110 transition-transform"
                                        bg={"bg"}>
                                <IconLogout />
                            </ActionIcon>
                        )}

                        <ActionIcon
                            size="lg"
                            variant="light"
                            className="lg:hidden hover:scale-110 transition-transform"
                            onClick={() => setDrawerOpened(true)}
                        >
                            <IconMenu2 color={theme.colors.text[0]} />
                        </ActionIcon>
                    </div>

                    <Drawer
                        opened={drawerOpened}
                        onClose={() => setDrawerOpened(false)}
                        padding="md"
                        size="md"
                        className="lg:hidden"

                    >
                        <nav className="flex flex-col gap-4">
                            <ProductSearch />
                            <Button component={Link} to="/" variant="subtle" color="primary">
                                Home
                            </Button>
                            <Button component={Link} to="/shop" variant="subtle" color="primary">
                                Shop
                            </Button>
                            <Button component={Link} to="/about" variant="subtle" color="primary">
                                About Us
                            </Button>
                            <Button component={Link} to="/contact" variant="subtle" color="primary">
                                Contact
                            </Button>
                        </nav>
                    </Drawer>
                </div>
            </header>
        </>
    );
}

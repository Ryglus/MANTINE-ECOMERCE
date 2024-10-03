import { Group, ActionIcon, Button, Image } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconShoppingCart, IconUser } from '@tabler/icons-react';

export default function PageHeader() {
    return (
        <header className="w-full bg-gray-100 shadow-md ">
            <Group className="max-w-screen-xl mx-auto">

                {/* Left side - Logo */}
                <Group>
                    <Link to="/">
                        <div className="flex items-center justify-center">
                            <Image
                                radius="100%"
                                height={64}
                                width={64}
                                fit="contain"
                                src="/logo.webp"
                                alt="VelvetCove Logo"
                            />
                        </div>
                    </Link>
                </Group>

                {/* Center - Navigation Links */}
                <Group className="hidden md:flex">
                    <Link to="/shop" className="text-gray-700 hover:text-gray-900 font-medium">
                        Shop
                    </Link>

                    <Link to="/contact" className="text-gray-700 hover:text-gray-900 font-medium">
                        Contact
                    </Link>
                </Group>

                {/* Right side - CTA and Icons */}
                <Group>
                    {/* CTA Button */}
                    <Button
                        component={Link}
                        to="/order"
                        variant="outline"
                        color="red"
                        radius="md"
                        className="hover:bg-red-500 hover:text-white transition"
                    >
                        <Group>
                            <IconShoppingCart size={18} />
                            <span>Order Now</span>
                        </Group>
                    </Button>

                    {/* User Icon */}
                    <ActionIcon component={Link} to="/account">
                        <IconUser size={24} />
                    </ActionIcon>

                    {/* Cart Icon */}
                    <ActionIcon component={Link} to="/cart">
                        <IconShoppingCart size={24} />
                    </ActionIcon>
                </Group>
            </Group>
        </header>
    );
}

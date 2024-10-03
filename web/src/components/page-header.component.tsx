import { Group, ActionIcon, Button, Image } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconShoppingCart, IconUser } from '@tabler/icons-react';

export default function PageHeader() {
    return (
        <header className="absolute top-0 left-0 w-full p-4 mx-auto">
            <Group className="max-w-screen-xl mx-auto bg-white rounded-xl shadow-md relative z-10 p-4">

                {/* Left side - Logo */}
                <Group>
                    <Link to="/">
                        <div className="w-[100px] h-[100px] flex items-center justify-center z-20 relative -mt-10 -mb-10">
                            <Image
                                radius="100%"
                                fit="contain"
                                src="/logo.webp"
                                alt="VelvetCove Logo"
                                className="object-contain"
                            />
                        </div>
                    </Link>
                </Group>

                {/* Center - Navigation Links (Aligned to the right) */}
                <Group className="hidden md:flex ml-auto">
                    <Link to="/shop" className="text-gray-700 hover:text-gray-900 font-medium">
                        Shop
                    </Link>

                    <Link to="/contact" className="text-gray-700 hover:text-gray-900 font-medium">
                        Contact
                    </Link>
                </Group>

                {/* Right side - CTA and Icons (Aligned to the right) */}
                <Group className="ml-4">
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

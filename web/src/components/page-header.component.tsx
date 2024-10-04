import { useState, useEffect } from 'react';
import { Group, ActionIcon, Button, Image, Divider } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconShoppingCart, IconUser } from '@tabler/icons-react';

export default function PageHeader() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 150) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    //TODO: eventualy add some colour cuz it cant stay white
    return (
        <header className={`fixed top-0 left-0 w-full p-4 mx-auto z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'mt-1' : 'mt-3'}`}>
            <Group className="max-w-screen-xl mx-auto bg-white rounded-xl shadow-md relative z-10 p-4">

                <Group>
                    <Link to="/">
                        <div
                            className={`transition-all duration-300 ease-in-out ${
                                isScrolled ? 'w-[87px] h-[87px]' : 'w-[107px] h-[107px]'
                            } flex items-center justify-center z-20 relative -mt-10 -mb-10`}
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

                </Group>

                <Group className="hidden md:flex ml-auto">
                    <Link to="/products" className="text-gray-700 hover:text-gray-900 font-medium">
                        Shop
                    </Link>

                    <Link to="/contact" className="text-gray-700 hover:text-gray-900 font-medium">
                        Contact
                    </Link>
                </Group>

                <Divider orientation="vertical" color="gray" />

                <Group className="ml-4">
                    <Button
                        component={Link}
                        to="/order"
                        variant="outline"
                        color="red"
                        radius="md"
                        className="hover:bg-red-500 hover:text-white transition"
                    >
                        <Group>
                            <IconShoppingCart size={18}/>
                            <span>Order Now</span>
                        </Group>
                    </Button>

                    <Divider orientation="vertical" color="gray" />

                    <ActionIcon size={"lg"} component={Link} to="/account">
                        <IconUser size={24}/>
                    </ActionIcon>

                    <ActionIcon size={"lg"} component={Link} to="/cart">
                        <IconShoppingCart size={24}/>
                    </ActionIcon>
                </Group>
            </Group>
        </header>
    );
}

import {Link, Outlet, useLocation} from 'react-router-dom';
import {Burger, Button, Center, Drawer, Stack, Tooltip, UnstyledButton, useMantineTheme} from '@mantine/core';
import {IconBox, IconDeviceDesktopAnalytics, IconHome2, IconLogout, IconSettings, IconUser} from '@tabler/icons-react';
import {useState} from 'react';
import SvgPageBg from "../../components/common/svg-page-bg.component";
import useDynamicTitle from "../../hooks/useDynamicTitle";

interface NavbarLinkProps {
    icon: typeof IconHome2;
    label: string;
    to: string;
    active?: boolean;
}

function NavbarLink({ icon: Icon, label, to, active }: NavbarLinkProps) {
    return (
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
            <UnstyledButton
                component={Link}
                to={to}
                className={`flex items-center justify-center rounded-md h-12 w-12 transition-colors duration-200 ${
                    active ? 'bg-[#9d82b0] text-white' : 'text-gray-500 hover:bg-[#362542]'
                }`}
            >
                <Icon className="w-5 h-5" stroke={1.5} />
            </UnstyledButton>
        </Tooltip>
    );
}

export default function DashboardLayout() {
    const location = useLocation();
    const [opened, setOpened] = useState(false);
    const theme = useMantineTheme();
    const links = [
        { icon: IconHome2, label: 'Dashboard', to: '/dashboard' },
        { icon: IconDeviceDesktopAnalytics, label: 'Analytics', to: '/dashboard/analytics' },
        { icon: IconBox, label: 'Products', to: '/dashboard/products' },
        { icon: IconUser, label: 'Account', to: '/dashboard/account' },
        { icon: IconSettings, label: 'Settings', to: '/dashboard/settings' },
    ];
    const currentLink = links.find(link => link.to === location.pathname);
    useDynamicTitle(`${currentLink ? currentLink.label : 'Dashboard'}`);
    return (
        <SvgPageBg>
            <div
                className="md:hidden w-full text-white border-b flex justify-between items-center px-4 py-2"
                style={{ backgroundColor: theme.colors.bg[9] }}
            >
                <Link to="/">
                    <img src="/logo2edit.webp" alt="logo" className="h-10" />
                </Link>
                <Burger opened={opened} onClick={() => setOpened(!opened)} size="sm" />
            </div>

            <Drawer opened={opened} onClose={() => setOpened(false)} padding="md" size="xs" withCloseButton={false}>
                <Stack>
                    {links.map((link) => (
                        <Button
                            key={link.label}
                            component={Link}
                            to={link.to}
                            variant="subtle"
                            color={location.pathname === link.to ? "primary" : "secondary"}
                        >
                            {link.label}
                        </Button>
                    ))}
                    <NavbarLink icon={IconLogout} label="Logout" to="/logout" />
                </Stack>
            </Drawer>

            <div className="flex h-svh overflow-hidden">
                <nav
                    className="hidden md:flex border-r flex-col justify-between text-white p-2"
                    style={{ backgroundColor: theme.colors.bg[9] }}
                >
                    <Center>
                        <Link to="/">
                            <img src="/logo2edit.webp" alt="logo" className="h-14" />
                        </Link>
                    </Center>
                    <Stack className="mt-8 space-y-4 p-2">
                        {links.map((link) => (
                            <NavbarLink
                                key={link.label}
                                icon={link.icon}
                                label={link.label}
                                to={link.to}
                                active={location.pathname === link.to}
                            />
                        ))}
                    </Stack>
                    <Center>
                        <NavbarLink icon={IconLogout} label="Logout" to="/logout" />
                    </Center>
                </nav>
                <div className="flex-grow p-4 overflow-auto">
                    <Outlet />
                </div>
            </div>
        </SvgPageBg>
    );
}

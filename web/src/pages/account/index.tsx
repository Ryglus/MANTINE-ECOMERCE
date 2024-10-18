import {Button, Group} from '@mantine/core';
import {useNavigate} from 'react-router-dom';
import {useAuthStore} from "../../store/auth-store";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import AccountDetail from "./_components/account-detail.component";
import MainLayout from "../../layouts/index-layout";
import SvgPageBg from "../../components/ui/svg-page-bg.component";

const AccountPage = () => {
    const token = useAuthStore((state) => state.token);
    const clearAuth = useAuthStore((state) => state.clearAuth);
    useAuthRedirect({});
    const navigate = useNavigate();

    const handleLogout = () => {
        clearAuth();
        navigate('/account/login');
    };

    return (
        <SvgPageBg>
            <MainLayout>
                {token && (
                    <div>
                        <AccountDetail/>
                        <Group mt="md">
                            <Button color="red" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Group>
                    </div>
                )}
            </MainLayout>
        </SvgPageBg>
    );
};

export default AccountPage;

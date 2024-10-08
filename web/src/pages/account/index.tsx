import { Button, Group, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from "../../store/auth-store";
import AccountLayout from "./_layout/account-layout";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import AccountDetail from "./_components/account-detail.component";

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
        <AccountLayout>
            {token && (
                <div>
                    <Text>Welcome, User!</Text>
                    {/*<AccountDetail/>*/}
                    <Group mt="md">
                        <Button color="red" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Group>
                </div>
            )}
        </AccountLayout>
    );
};

export default AccountPage;

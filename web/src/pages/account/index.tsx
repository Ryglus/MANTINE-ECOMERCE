import {useAuthStore} from '../../store/auth-store';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import AccountDetail from './_components/account-detail.component';
import MainLayout from '../../layouts/index-layout';
import SvgPageBg from '../../components/common/svg-page-bg.component';
import useDynamicTitle from '../../hooks/useDynamicTitle';

export default function AccountPage() {
    const token = useAuthStore((state) => state.token);
    useAuthRedirect({});
    useDynamicTitle('Account');

    return (
        <SvgPageBg>
            <MainLayout>
                {token && <AccountDetail />}
            </MainLayout>
        </SvgPageBg>
    );
}

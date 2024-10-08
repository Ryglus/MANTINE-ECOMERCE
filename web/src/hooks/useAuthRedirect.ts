import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth-store';

interface UseAuthRedirectOptions {
    redirectToAccountOnAuth?: boolean;
    redirectToLoginOnUnauth?: boolean;
}

const useAuthRedirect = ({ redirectToAccountOnAuth = true, redirectToLoginOnUnauth = true }: UseAuthRedirectOptions) => {
    const token = useAuthStore((state) => state.token);
    const navigate = useNavigate();

    useEffect(() => {
        if (token && redirectToAccountOnAuth) {
            navigate('/account');
        }

        if (!token && redirectToLoginOnUnauth) {
            navigate('/account/login');
        }
    }, [token, navigate, redirectToAccountOnAuth, redirectToLoginOnUnauth]);
};

export default useAuthRedirect;

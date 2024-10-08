import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthStore } from '../../store/auth-store';
import { LoginResponse, LoginVariables } from './dto/account.dto';

const API_URL = 'https://fakestoreapi.com';

const loginMutationFn = async (variables: LoginVariables): Promise<LoginResponse> => {
    const { data } = await axios.post(`${API_URL}/auth/login`, variables);
    return data;
};

export const useLogin = () => {
    const setToken = useAuthStore((state) => state.setToken);
    const mutation = useMutation<LoginResponse, Error, LoginVariables>({
        mutationFn: loginMutationFn,
        onSuccess: (data) => {
            setToken(data.token);
            console.log('Login successful, token:', data.token);
        },
        onError: (error) => {
            console.error('Login failed:', error);
        }
    });

    return {
        mutate: mutation.mutate,
        isLoading: mutation.status == "pending",
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
        error: mutation.error,
    };
};

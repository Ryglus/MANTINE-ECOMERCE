import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { User } from './dto/account.dto';

const API_URL = 'https://fakestoreapi.com';

const userInfoMutationFn = async (variables: number): Promise<User> => {
    const { data } = await axios.get(`${API_URL}/users/${variables}`);
    return data;
};

export const useGetUserInfo = () => {
    const mutation = useMutation<User, Error,1>({
        mutationFn: userInfoMutationFn,
        onSuccess: (data) => {
            return data;
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

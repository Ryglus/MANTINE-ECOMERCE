import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {User} from './dto/account.dto';
import {useAuthStore} from '../../store/auth-store';

const API_URL = 'https://fakestoreapi.com';

const userInfoMutationFn = async (variables: number): Promise<User> => {
    const { data } = await axios.get(`${API_URL}/users/${variables}`);
    return data;
};
export const fetchUsers = async (): Promise<User[]> => {
    const { data } = await axios.get("https://fakestoreapi.com/users");
    return data;
};

export const useGetUserInfo = () => {
    const setUser = useAuthStore((state) => state.setUser);
    return useMutation({
        mutationFn: userInfoMutationFn,
        onSuccess: (user) => {
            setUser(user);
        },
        onError: (error) => {
            console.error('Login failed:', error);
        }
    });
};

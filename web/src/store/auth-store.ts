import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../lib/api/dto/account.dto';

interface AuthState {
    token: string | null;
    user: User | null;
    setToken: (token: string | null) => void;
    setUser: (user: User | null) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,

            setToken: (token: string | null) => {
                set({ token });
            },

            setUser: (user: User | null) => {
                set({ user });
            },

            clearAuth: () => {
                set({ token: null, user: null });
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);

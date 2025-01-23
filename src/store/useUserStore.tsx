import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { get, post } from '../api/apiClient';

interface User {
    id: number;
    name: string;
    email: string;
}

interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
    fetchUsers: () => Promise<void>;
    addUser: (user: Omit<User, 'id'>) => Promise<void>;
}

const useUserStore = create<UserState>((set) => ({
    users: [],
    loading: false,
    error: null,

    fetchUsers: async () => {
        set({ loading: true, error: null });
        try {
            const users = await get<User[]>('/users'); // 공통 GET 함수 사용
            set({ users, loading: false });
        } catch (error) {
            set({ error: 'Failed to fetch users', loading: false });
        }
    },

    addUser: async (user) => {
        set({ loading: true, error: null });
        try {
            const newUser = await post<Omit<User, 'id'>, User>('/users', user); // 공통 POST 함수 사용
            set((state) => ({ users: [...state.users, newUser], loading: false }));
        } catch (error) {
            set({ error: 'Failed to add user', loading: false });
        }
    },
}));

export default useUserStore;

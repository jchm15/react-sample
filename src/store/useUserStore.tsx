import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {axiosPost, axiosGet} from '../api/apiClient';

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
    // addUser: (user: Omit<User, 'id' | 'name'>) => Promise<void>; //여러 필드 제외하는법 -> '|' 로 각 field 제외
}

const useUserStore = create<UserState>()(
    devtools((set, get) => ({
        users: [],
        loading: false,
        error: null,

        fetchUsers: async () => {
            set({loading: true, error: null});
            try {
                const users = await axiosGet<User[]>('/users'); // 공통 GET 함수 사용
                set({users, loading: false});
                console.log(get().users)
            } catch (error) {
                set({error: 'Failed to fetch users', loading: false});
            }
        },

        addUser: async (user) => {
            set({loading: true, error: null});
            try {
                const newUser = await axiosPost<Omit<User, 'id'>, User>('/users', user); // 공통 POST 함수 사용
                set((state) => ({users: [...state.users, newUser], loading: false}));
            } catch (error) {
                set({error: 'Failed to add user', loading: false});
            }
        },
    }), {name: 'UserStore'})
);

export default useUserStore;

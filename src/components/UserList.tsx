import { useEffect, FC } from 'react';
import useUserStore from '../store/useUserStore';

const UserList: FC = () => {
    const { users, loading, error, fetchUsers, addUser } = useUserStore();

    useEffect(() => {
        // useEffect 내부에서는 리액트의 동기 함수 제약 때문에 즉시 실행 함수가 필요
        // useEffect는 리액트의 라이프사이클 훅으로,
        // 컴포넌트 렌더링 후 특정 작업을 수행하기 위해 사용.
        // 리액트는 useEffect에 전달된 함수가 동기적이기를 기대.
        // 그래서 async를 직접적으로 사용할 수 없고,
        // 즉시 실행 함수를 사용해 비동기 작업을 감싸야 함.
        (async () => {
            try {
                await fetchUsers(); // 사용자 데이터 가져오기
            } catch (error) {
                console.error('Error fetching users:', error); // 에러 처리
            }
        })();
    }, [fetchUsers]);

    const handleAddUser = async () => {
        await addUser({ name: 'New User', email: 'newuser@example.com' });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <ul>
                {users.map((user, idx) => (
                    <li key={idx}>
                        {user.name} ({user.email})
                    </li>
                ))}
            </ul>
            <button onClick={handleAddUser}>Add User</button>
        </div>
    );
};

export default UserList;

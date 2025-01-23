import {FC, useEffect, useState} from 'react';

const Home: FC = () => {
    const [msg, setMsg] = useState<boolean>(true);

    const testClickEvent = () => {
        setMsg(!msg);
    }
    useEffect(() => {
        console.log("렌더링 시 실행 홈")

        return () => {
            // alert("언마운트 홈")
        }
    }, [])

    return (
        <div>
            <h1>홈페이지입니다.</h1>
            <p>라우터 실습을 위하여 만들어봅시다.</p>
            <button onClick={testClickEvent}>{msg ? '버튼' : '메롱'}</button>
        </div>
    );
};

export default Home;